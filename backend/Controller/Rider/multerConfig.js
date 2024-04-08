const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile-pictures'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const generatedFilename = file.fieldname + '-' + uniqueSuffix + fileExtension;
    console.log('Generated filename:', generatedFilename);
    cb(null, generatedFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
