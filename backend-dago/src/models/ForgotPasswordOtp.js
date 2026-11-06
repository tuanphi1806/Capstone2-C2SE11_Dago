const mongoose = require('mongoose');

const forgotPasswordOtpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        code: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

forgotPasswordOtpSchema.index({ email: 1 });
forgotPasswordOtpSchema.index({ code: 1 });

module.exports = mongoose.model('ForgotPasswordOtp', forgotPasswordOtpSchema);