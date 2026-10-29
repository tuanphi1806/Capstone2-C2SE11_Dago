const Route = require('../models/Route');
const Stop = require('../models/Stop');

const {
    haversineDistance,
    estimateWalkMinutes,
    estimateBusMinutes
} = require('../utils/geo');

function getStopLatLng(stop) {
    return {
        lat: stop.location.coordinates[1],
        lng: stop.location.coordinates[0]
    };
}

function distanceToStop(point, stop) {
    const lat = stop.location.coordinates[1];
    const lng = stop.location.coordinates[0];
    return haversineDistance(point.lat, point.lng, lat, lng);
}

function distanceBetweenStops(stopA, stopB) {
    const a = stopA.location.coordinates;
    const b = stopB.location.coordinates;
    return haversineDistance(a[1], a[0], b[1], b[0]);
}

function buildCumulativeDistances(stops) {
    const cumulative = new Array(stops.length).fill(0);
    for (let i = 1; i < stops.length; i++) {
        cumulative[i] = cumulative[i - 1] + distanceBetweenStops(stops[i - 1], stops[i]);
    }
    return cumulative;
}

function busDistanceBetweenIndexes(cumulativeDistances, fromIndex, toIndex) {
    if (toIndex <= fromIndex) return 0;
    return cumulativeDistances[toIndex] - cumulativeDistances[fromIndex];
}

function findBestStopPair({ origin, destination, stops, maxWalkingDistance }) {
    const pickupCandidates = [];
    const dropoffCandidates = [];

    for (let index = 0; index < stops.length; index++) {
        const stop = stops[index];
        const pickupDistance = distanceToStop(origin, stop);
        if (pickupDistance <= maxWalkingDistance) {
            pickupCandidates.push({ stop, index, distanceMeters: pickupDistance });
        }

        const dropoffDistance = distanceToStop(destination, stop);
        if (dropoffDistance <= maxWalkingDistance) {
            dropoffCandidates.push({ stop, index, distanceMeters: dropoffDistance });
        }
    }

    let bestPair = null;
    let bestScore = Number.MAX_SAFE_INTEGER;

    for (const pickup of pickupCandidates) {
        for (const dropoff of dropoffCandidates) {
            if (pickup.index >= dropoff.index) continue;

            const stopSpan = dropoff.index - pickup.index;
            const score = pickup.distanceMeters + dropoff.distanceMeters + stopSpan * 100;

            if (score < bestScore) {
                bestScore = score;
                bestPair = { pickup, dropoff };
            }
        }
    }

    return bestPair;
}

function buildBusPolylineByIndex(stops, fromIndex, toIndex) {
    return stops.slice(fromIndex, toIndex + 1).map((item) => ({
        lat: item.location.coordinates[1],
        lng: item.location.coordinates[0]
    }));
}

function buildBusPolylineByOrder(stops, fromOrder, toOrder) {
    return stops
        .filter((item) => item.order >= fromOrder && item.order <= toOrder)
        .map((item) => ({
            lat: item.location.coordinates[1],
            lng: item.location.coordinates[0]
        }));
}

function toBusSegment({ route, pickupStop, dropoffStop, stopsCount, durationMinutes }) {
    return {
        type: 'bus',
        routeId: route._id,
        code: route.code,
        routeName: route.name,
        pickupStopName: pickupStop.name,
        dropoffStopName: dropoffStop.name,
        stopsCount,
        durationMinutes
    };
}

function toWalkSegment(distanceMeters) {
    return {
        type: 'walk',
        durationMinutes: estimateWalkMinutes(distanceMeters)
    };
}

function normalizeSegments(segments) {
    return segments.filter((segment) => {
        if (segment.type !== 'walk') return true;
        return segment.durationMinutes > 0;
    });
}

const MIN_STOPS_PER_BUS_SEGMENT = 2;
const TRANSFER_WALK_PENALTY_PER_MINUTE = 6;
const DIRECT_PREFERENCE_WINDOW_MINUTES = 5;

function hasTooShortBusSegment(route) {
    return route.segments.some(
        (segment) =>
            segment.type === 'bus' && (segment.stopsCount || 0) < MIN_STOPS_PER_BUS_SEGMENT
    );
}

function getTotalWalkMinutes(route) {
    return route.segments
        .filter((segment) => segment.type === 'walk')
        .reduce((sum, segment) => sum + (segment.durationMinutes || 0), 0);
}

function rankScore(route) {
    if (route.type !== 'transfer') {
        return route.totalDuration;
    }

    // Phat manh transfer co tong thoi gian di bo lon.
    return route.totalDuration + getTotalWalkMinutes(route) * TRANSFER_WALK_PENALTY_PER_MINUTE;
}

function parseTimeToMinutes(timeText) {
    if (typeof timeText !== 'string') return null;
    const match = /^(\d{1,2}):(\d{2})$/.exec(timeText.trim());
    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

    return hours * 60 + minutes;
}

function buildTimeline(pickupStop, dropoffStop) {
    const pickupTimes = Array.isArray(pickupStop.times) ? pickupStop.times : [];
    const dropoffTimes = Array.isArray(dropoffStop.times) ? dropoffStop.times : [];

    let startTime = null;
    let endTime = null;

    const pairCount = Math.min(pickupTimes.length, dropoffTimes.length);
    for (let i = 0; i < pairCount; i++) {
        const pickupTime = pickupTimes[i];
        const dropoffTime = dropoffTimes[i];
        const pickupMinute = parseTimeToMinutes(pickupTime);
        const dropoffMinute = parseTimeToMinutes(dropoffTime);

        if (pickupMinute == null || dropoffMinute == null) continue;
        if (dropoffMinute < pickupMinute) continue;

        startTime = pickupTime;
        endTime = dropoffTime;
        break;
    }

    if (!startTime && pickupTimes.length) startTime = pickupTimes[0];
    if (!endTime && dropoffTimes.length) endTime = dropoffTimes[0];

    return { startTime, endTime };
}

function buildDirectSuggestion({ route, stops, cumulativeDistances, pickupResult, dropoffResult }) {
    const pickupStop = pickupResult.stop;
    const dropoffStop = dropoffResult.stop;

    const busDistanceMeters = busDistanceBetweenIndexes(
        cumulativeDistances,
        pickupResult.index,
        dropoffResult.index
    );

    const walkStartMinutes = estimateWalkMinutes(pickupResult.distanceMeters);
    const walkEndMinutes = estimateWalkMinutes(dropoffResult.distanceMeters);
    const busMinutes = estimateBusMinutes(busDistanceMeters);
    const totalDuration = walkStartMinutes + busMinutes + walkEndMinutes;

    return {
        type: 'direct',
        totalDuration,
        segments: normalizeSegments([
            toWalkSegment(pickupResult.distanceMeters),
            toBusSegment({
                route,
                pickupStop,
                dropoffStop,
                stopsCount: dropoffResult.index - pickupResult.index,
                durationMinutes: busMinutes
            }),
            toWalkSegment(dropoffResult.distanceMeters)
        ]),
        summary: {
            title: `${totalDuration} phut`
        },
        meta: {
            routeId: route._id,
            code: route.code,
            routeName: route.name,
            pickupStopId: pickupStop._id,
            dropoffStopId: dropoffStop._id,
            pickupOrder: pickupStop.order,
            dropoffOrder: dropoffStop.order,
            walkToPickupMeters: Math.round(pickupResult.distanceMeters),
            walkToDestinationMeters: Math.round(dropoffResult.distanceMeters),
            busPolyline: buildBusPolylineByIndex(stops, pickupResult.index, dropoffResult.index)
        }
    };
}

function findBestTransferSuggestion({
    routeA,
    stopsA,
    cumulativeA,
    routeB,
    stopsB,
    cumulativeB,
    origin,
    destination,
    maxWalkingDistance
}) {
    const pickupCandidates = [];
    const dropoffCandidates = [];

    for (let i = 0; i < stopsA.length; i++) {
        const distance = distanceToStop(origin, stopsA[i]);
        if (distance <= maxWalkingDistance) {
            pickupCandidates.push({ index: i, distanceMeters: distance });
        }
    }

    for (let i = 0; i < stopsB.length; i++) {
        const distance = distanceToStop(destination, stopsB[i]);
        if (distance <= maxWalkingDistance) {
            dropoffCandidates.push({ index: i, distanceMeters: distance });
        }
    }

    if (!pickupCandidates.length || !dropoffCandidates.length) return null;

    let best = null;
    let bestScore = Number.MAX_SAFE_INTEGER;

    for (const pickup of pickupCandidates) {
        for (const dropoff of dropoffCandidates) {
            for (let transferOutIndex = pickup.index + 1; transferOutIndex < stopsA.length; transferOutIndex++) {
                for (let transferInIndex = 0; transferInIndex < dropoff.index; transferInIndex++) {
                    const transferWalkMeters = distanceBetweenStops(
                        stopsA[transferOutIndex],
                        stopsB[transferInIndex]
                    );

                    if (transferWalkMeters > maxWalkingDistance) continue;

                    const bus1Meters = busDistanceBetweenIndexes(
                        cumulativeA,
                        pickup.index,
                        transferOutIndex
                    );
                    const bus2Meters = busDistanceBetweenIndexes(
                        cumulativeB,
                        transferInIndex,
                        dropoff.index
                    );

                    const walkStartMinutes = estimateWalkMinutes(pickup.distanceMeters);
                    const bus1Minutes = estimateBusMinutes(bus1Meters);
                    const walkTransferMinutes = estimateWalkMinutes(transferWalkMeters);
                    const bus2Minutes = estimateBusMinutes(bus2Meters);
                    const walkEndMinutes = estimateWalkMinutes(dropoff.distanceMeters);

                    const totalDuration =
                        walkStartMinutes +
                        bus1Minutes +
                        walkTransferMinutes +
                        bus2Minutes +
                        walkEndMinutes;

                    const score =
                        totalDuration * 1000 +
                        pickup.distanceMeters +
                        transferWalkMeters +
                        dropoff.distanceMeters;

                    if (score < bestScore) {
                        bestScore = score;
                        best = {
                            totalDuration,
                            pickup,
                            transferOutIndex,
                            transferInIndex,
                            dropoff,
                            transferWalkMeters,
                            bus1Minutes,
                            bus2Minutes
                        };
                    }
                }
            }
        }
    }

    if (!best) return null;

    const pickupStop = stopsA[best.pickup.index];
    const transferOutStop = stopsA[best.transferOutIndex];
    const transferInStop = stopsB[best.transferInIndex];
    const dropoffStop = stopsB[best.dropoff.index];

    return {
        type: 'transfer',
        totalDuration: best.totalDuration,
        segments: normalizeSegments([
            toWalkSegment(best.pickup.distanceMeters),
            toBusSegment({
                route: routeA,
                pickupStop,
                dropoffStop: transferOutStop,
                stopsCount: best.transferOutIndex - best.pickup.index,
                durationMinutes: best.bus1Minutes
            }),
            toWalkSegment(best.transferWalkMeters),
            toBusSegment({
                route: routeB,
                pickupStop: transferInStop,
                dropoffStop,
                stopsCount: best.dropoff.index - best.transferInIndex,
                durationMinutes: best.bus2Minutes
            }),
            toWalkSegment(best.dropoff.distanceMeters)
        ]),
        summary: {
            title: `${best.totalDuration} phut`
        },
        meta: {
            routeAId: routeA._id,
            routeBId: routeB._id,
            transferOutStopId: transferOutStop._id,
            transferInStopId: transferInStop._id,
            walkTransferMeters: Math.round(best.transferWalkMeters)
        }
    };
}

async function searchTrips({ origin, destination, maxWalkingDistance = 1000, limit = 5 }) {
    const routes = await Route.find().lean();
    const routeData = [];
    const suggestions = [];

    for (const route of routes) {
        const stops = await Stop.find({ routeId: route._id }).sort({ order: 1 }).lean();
        if (!stops.length) continue;

        routeData.push({
            route,
            stops,
            cumulativeDistances: buildCumulativeDistances(stops)
        });
    }

    for (const item of routeData) {
        const bestPair = findBestStopPair({
            origin,
            destination,
            stops: item.stops,
            maxWalkingDistance
        });

        if (!bestPair) continue;

        suggestions.push(
            buildDirectSuggestion({
                route: item.route,
                stops: item.stops,
                cumulativeDistances: item.cumulativeDistances,
                pickupResult: bestPair.pickup,
                dropoffResult: bestPair.dropoff
            })
        );
    }

    for (let i = 0; i < routeData.length; i++) {
        for (let j = 0; j < routeData.length; j++) {
            if (i === j) continue;

            const transferSuggestion = findBestTransferSuggestion({
                routeA: routeData[i].route,
                stopsA: routeData[i].stops,
                cumulativeA: routeData[i].cumulativeDistances,
                routeB: routeData[j].route,
                stopsB: routeData[j].stops,
                cumulativeB: routeData[j].cumulativeDistances,
                origin,
                destination,
                maxWalkingDistance
            });

            if (transferSuggestion) {
                suggestions.push(transferSuggestion);
            }
        }
    }

    const filtered = suggestions.filter((route) => !hasTooShortBusSegment(route));

    filtered.sort((a, b) => {
        if (a.type !== b.type) {
            if (
                a.type === 'direct' &&
                b.type === 'transfer' &&
                Math.abs(a.totalDuration - b.totalDuration) <= DIRECT_PREFERENCE_WINDOW_MINUTES
            ) {
                return -1;
            }
            if (
                b.type === 'direct' &&
                a.type === 'transfer' &&
                Math.abs(a.totalDuration - b.totalDuration) <= DIRECT_PREFERENCE_WINDOW_MINUTES
            ) {
                return 1;
            }
        }

        const aScore = rankScore(a);
        const bScore = rankScore(b);
        if (aScore !== bScore) return aScore - bScore;
        if (a.totalDuration !== b.totalDuration) return a.totalDuration - b.totalDuration;
        return a.segments.length - b.segments.length;
    });

    return filtered.slice(0, limit);
}

async function getTripDetail({
    routeId,
    pickupOrder,
    dropoffOrder,
    origin,
    destination
}) {
    const route = await Route.findById(routeId).lean();
    if (!route) {
        throw new Error('Khong tim thay tuyen');
    }

    const stops = await Stop.find({
        routeId,
        order: { $gte: pickupOrder, $lte: dropoffOrder }
    })
        .sort({ order: 1 })
        .lean();

    if (!stops.length) {
        throw new Error('Khong tim thay stop cua hanh trinh');
    }

    const pickupStop = stops[0];
    const dropoffStop = stops[stops.length - 1];
    const timeline = buildTimeline(pickupStop, dropoffStop);

    const walkingStartPolyline = [
        { lat: origin.lat, lng: origin.lng },
        getStopLatLng(pickupStop)
    ];

    const busPolyline = buildBusPolylineByOrder(stops, pickupOrder, dropoffOrder);

    const walkingEndPolyline = [
        getStopLatLng(dropoffStop),
        { lat: destination.lat, lng: destination.lng }
    ];

    return {
        route: {
            id: route._id,
            code: route.code,
            name: route.name,
            description: route.description,
            startName: route.startName,
            endName: route.endName
        },
        pickupStop: {
            id: pickupStop._id,
            stopCode: pickupStop.stopCode,
            name: pickupStop.name,
            order: pickupStop.order,
            times: pickupStop.times || []
        },
        dropoffStop: {
            id: dropoffStop._id,
            stopCode: dropoffStop.stopCode,
            name: dropoffStop.name,
            order: dropoffStop.order,
            times: dropoffStop.times || []
        },
        startTime: timeline.startTime,
        endTime: timeline.endTime,
        stops: stops.map((item) => ({
            id: item._id,
            stopCode: item.stopCode,
            name: item.name,
            order: item.order,
            times: item.times || [],
            location: {
                lat: item.location.coordinates[1],
                lng: item.location.coordinates[0]
            }
        })),
        walkingStartPolyline,
        busPolyline,
        walkingEndPolyline
    };
}

module.exports = {
    searchTrips,
    getTripDetail
};