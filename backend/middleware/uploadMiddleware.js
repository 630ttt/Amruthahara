const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folders
const imageFolder = path.join(__dirname, "../uploads/images");
const videoFolder = path.join(__dirname, "../uploads/videos");
const modelFolder = path.join(__dirname, "../uploads/models");

// Create folders automatically
[imageFolder, videoFolder, modelFolder].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "images") {
      cb(null, imageFolder);
    } else if (file.fieldname === "video") {
      cb(null, videoFolder);
    } else if (file.fieldname === "model3d") {
      cb(null, modelFolder);
    } else {
      cb(new Error("Invalid upload field"));
    }
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  const imageTypes = [".jpg", ".jpeg", ".png", ".webp"];
  const videoTypes = [".mp4", ".webm", ".mov"];
  const modelTypes = [".glb", ".gltf"];

  if (
    file.fieldname === "images" &&
    imageTypes.includes(extension)
  ) {
    return cb(null, true);
  }

  if (
    file.fieldname === "video" &&
    videoTypes.includes(extension)
  ) {
    return cb(null, true);
  }

  if (
    file.fieldname === "model3d" &&
    modelTypes.includes(extension)
  ) {
    return cb(null, true);
  }

  cb(
    new Error(
      `Unsupported file type: ${file.originalname}`
    )
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;