const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "proposals", // all images stored in "proposals" folder in Cloudinary
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proposals",
    allowed_formats: ["jpg", "png", "jpeg"],
    // ADD THESE TO MAKE IT FASTER:
    transformation: [
      { quality: "auto", fetch_format: "auto" } // Automatically compresses the image
    ]
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
