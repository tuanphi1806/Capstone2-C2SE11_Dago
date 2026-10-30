const crypto = require('crypto');

function generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

module.exports = { generateOtp };