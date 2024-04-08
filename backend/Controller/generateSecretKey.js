const crypto = require('crypto');
const fs = require('fs');

// Generate a random key with 32 bytes (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');

// Save the secret key to a file
fs.writeFileSync('.env', `JWT_SECRET=${secretKey}\n`);

console.log('Generated Secret Key:', secretKey);
