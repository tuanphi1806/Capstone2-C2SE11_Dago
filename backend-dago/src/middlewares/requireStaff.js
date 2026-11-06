/** Dùng sau auth. Chỉ cho phép user có role === 'admin'. */
function requireStaff(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
    }
    if (req.user.role !== 'staff') {
        return res.status(403).json({ success: false, message: 'Chỉ staff mới có quyền thực hiện' });
    }
    next();
}

module.exports = requireStaff;