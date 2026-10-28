
const Route = require('../models/Route');
const Stop = require('../models/Stop');

async function createStop(userId, data) {
    const route = await Route.findOne({ _id: data.routeId, userId });
    if (!route) throw new Error('Tuyến không tồn tại hoặc không có quyền thêm điểm dừng');

    const stop = await Stop.create({
        routeId: data.routeId,
        stopId: data.stopId,
        name: data.name,
        location: data.location || { type: 'Point', coordinates: [0, 0] },
        times: data.times || [],
        order: data.order != null ? data.order : route.stops.length,
    });

    return stop;
}

async function updateStop(stopId, userId, data) {
    const stop = await Stop.findById(stopId);
    if (!stop) throw new Error('Điểm dừng không tồn tại');

    const route = await Route.findOne({ _id: stop.routeId, userId });
    if (!route) throw new Error('Không có quyền sửa điểm dừng này');

    const { routeId, ...allowed } = data;
    Object.assign(stop, allowed);
    await stop.save();
    return stop;
}

async function deleteStop(stopId, userId) {
    const stop = await Stop.findById(stopId);
    if (!stop) throw new Error('Điểm dừng không tồn tại');

    const route = await Route.findOne({ _id: stop.routeId, userId });
    if (!route) throw new Error('Không có quyền xóa điểm dừng này');

    await Stop.findByIdAndDelete(stopId);
    return stop;
}

async function listStopsByRoute({ routeId, page = 1, limit = 100 }) {
    const query = { routeId };
    const skip = (page - 1) * limit;

    const [stops] = await Promise.all([
        Stop.find(query).sort({ order: 1 }).skip(skip).limit(limit).lean(),
    ]);

    return stops;
}

async function getStopById(stopId) {
    const stop = await Stop.findById(stopId).populate('routeId', 'code name startName endName').lean();
    if (!stop) throw new Error('Điểm dừng không tồn tại');
    return stop;
}

module.exports = {
    createStop,
    updateStop,
    deleteStop,
    listStopsByRoute,
    getStopById,
};