const multer = require('multer');
const path = require('path');

// Define storage options for Multer (where to save the file and what to name it)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder to save the file
    cb(null, 'public/images'); // Save to 'public/images' folder
  },
  filename: (req, file, cb) => {
    // Specify the filename to be saved (e.g., original name or a unique name)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Set file upload limits (optional)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit (optional)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Export the upload middleware
module.exports = upload;
