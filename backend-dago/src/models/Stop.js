const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema(
    {
        routeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
            required: true,
        },
        stopCode: { type: String, required: true },
        name: { type: String, required: true },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number], // [lng, lat]
                required: true,
            },
        },
        times: [{ type: String }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

stopSchema.index({ routeId: 1, order: 1 });
stopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Stop', stopSchema);