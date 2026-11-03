const tripService = require('../services/tripService');

async function searchTrip(req, res) {
    try {
        const { origin, destination, maxWalkingDistance, limit } = req.body;

        if (
            !origin ||
            typeof origin.lat !== 'number' ||
            typeof origin.lng !== 'number' ||
            !destination ||
            typeof destination.lat !== 'number' ||
            typeof destination.lng !== 'number'
        ) {
            return res.status(400).json({
                success: false,
                message: 'origin và destination phải có lat/lng hợp lệ'
            });
        }

        const parsedMaxWalkingDistance = Number(maxWalkingDistance);
        const parsedLimit = Number(limit);
        const finalMaxWalkingDistance =
            Number.isFinite(parsedMaxWalkingDistance) && parsedMaxWalkingDistance > 0
                ? parsedMaxWalkingDistance
                : 1000;
        const finalLimit =
            Number.isFinite(parsedLimit) && parsedLimit > 0
                ? Math.min(Math.floor(parsedLimit), 20)
                : 5;

        const data = await tripService.searchTrips({
            origin,
            destination,
            maxWalkingDistance: finalMaxWalkingDistance,
            limit: finalLimit
        });

        return res.json({
            success: true,
            message: 'Tìm hành trình thành công',
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tìm hành trình',
            error: error.message
        });
    }
}

async function getTripDetail(req, res) {
    try {
        const { routeId, pickupOrder, dropoffOrder, origin, destination } = req.body;

        if (
            !routeId ||
            pickupOrder == null ||
            dropoffOrder == null ||
            !origin ||
            typeof origin.lat !== 'number' ||
            typeof origin.lng !== 'number' ||
            !destination ||
            typeof destination.lat !== 'number' ||
            typeof destination.lng !== 'number'
        ) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu dữ liệu trip detail'
            });
        }

        const data = await tripService.getTripDetail({
            routeId,
            pickupOrder: Number(pickupOrder),
            dropoffOrder: Number(dropoffOrder),
            origin,
            destination
        });

        return res.json({
            success: true,
            message: 'Lấy chi tiết hành trình thành công',
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy trip detail',
            error: error.message
        });
    }
}

module.exports = {
    searchTrip,
    getTripDetail
};