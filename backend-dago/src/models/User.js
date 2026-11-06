const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        full_name: { type: String, default: '' },
        email: { type: String, required: true, unique: true },
        phone: { type: String, default: '' },
        password: { type: String, required: true, select: false },
        gender: { type: String, default: '' },
        date_of_birth: { type: Date, default: null },
        occupation: { type: String, default: '' },
        province: { type: String, default: '' },
        district: { type: String, default: '' },
        ward: { type: String, default: '' },
        address_detail: { type: String, default: '' },
        is_priority_user: { type: Boolean, default: false },
        priority_user: { type: String, default: '' },
        image_proof: { type: String, default: '' },
        role: { type: String, enum: ['admin', 'staff', 'user'], default: 'user' },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 });
userSchema.index({ is_priority_user: 1 });
userSchema.index({ role: 1 });
userSchema.index({ active: 1 });
userSchema.index({ full_name: 'text' });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);