const mongoose = require('mongoose');

const pendingRegistrationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    otpCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

pendingRegistrationSchema.index({ email: 1 });
pendingRegistrationSchema.index({ otpCode: 1 });

module.exports = mongoose.model('PendingRegistration', pendingRegistrationSchema);