function toRad(value) {
    return (value * Math.PI) / 180;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimateWalkMinutes(meters) {
    return Math.round(meters / 80);
}

function estimateBusMinutes(meters) {
    return Math.round(meters / 300);
}

module.exports = {
    haversineDistance,
    estimateWalkMinutes,
    estimateBusMinutes
};