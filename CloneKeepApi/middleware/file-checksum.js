const crypto = require('crypto');

const generateChecksum = (algorithm) => (req, res, next) => {
    try {
        if (req.file) {
            const hash = crypto.createHash(algorithm);
            const stream = require('fs').createReadStream(req.file.path);

            stream.on('data', (data) => {
                hash.update(data, 'utf-8');
            });

            stream.on('end', () => {
                req.file.checksum = hash.digest('hex');
                next();
            });
        } else {
            next(); // If no file, move to the next middleware or route handler
        }
    } catch (error) {
        res.status(500).json({ message: 'Error generating checksum', error: error.message });
    }
};

module.exports = generateChecksum;
