const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const config = require('../config');

if (config.cloudinary.cloud_name && config.cloudinary.api_key && config.cloudinary.api_secret) {
    cloudinary.config({
        cloud_name: config.cloudinary.cloud_name,
        api_key: config.cloudinary.api_key,
        api_secret: config.cloudinary.api_secret,
    });
}

function uploadFromBuffer(buffer, options = {}) {
    return new Promise((resolve, reject) => {
        const folder = options.folder || config.cloudinary.folder;
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'image', ...options },
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
}

module.exports = { cloudinary, uploadFromBuffer };