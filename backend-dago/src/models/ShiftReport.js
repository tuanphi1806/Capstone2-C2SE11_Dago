const mongoose = require('mongoose');

const shiftReportSchema = new mongoose.Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        shiftStartAt: {
            type: Date,
            required: true
        },
        shiftEndAt: {
            type: Date,
            required: true
        },
        totalScans: {
            type: Number,
            default: 0,
            min: 0
        },
        successfulScans: {
            type: Number,
            default: 0,
            min: 0
        },
        failedScans: {
            type: Number,
            default: 0,
            min: 0
        },
        totalRevenue: {
            type: Number,
            default: 0,
            min: 0
        },
        note: {
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: String,
            enum: ['submitted', 'approved', 'rejected'],
            default: 'submitted',
            index: true
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        reviewNote: {
            type: String,
            default: '',
            trim: true
        },
        reviewedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

shiftReportSchema.index({ staffId: 1, shiftStartAt: -1 });
shiftReportSchema.index({ status: 1, createdAt: -1 });
shiftReportSchema.index({ staffId: 1, shiftStartAt: 1, shiftEndAt: 1 }, { unique: true });

module.exports = mongoose.model('ShiftReport', shiftReportSchema);