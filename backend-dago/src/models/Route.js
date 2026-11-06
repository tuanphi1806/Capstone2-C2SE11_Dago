const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String },
        isHot: { type: Boolean, default: false },
        turnOnDay: { type: Number, default: 0 },
        startName: { type: String },
        endName: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

routeSchema.index({ code: 1 });
routeSchema.index({ userId: 1 });
routeSchema.index({ staffId: 1 });
routeSchema.index({ name: 'text', description: 'text', startName: 'text', endName: 'text' });

module.exports = mongoose.model('Route', routeSchema);