const multer = require('multer');

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận ảnh: JPEG, PNG, GIF, WebP'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
});

const uploadMax5Images = upload.array('images', MAX_IMAGES);

module.exports = { uploadMax5Images, MAX_IMAGES };