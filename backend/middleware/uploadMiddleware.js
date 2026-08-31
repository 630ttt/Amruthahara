const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================================
// FOLDERS
// =====================================================

const videoFolder = path.join(
  __dirname,
  "../uploads/videos"
);

const modelFolder = path.join(
  __dirname,
  "../uploads/models"
);

// Create folders
[videoFolder, modelFolder].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, {
      recursive: true,
    });
  }
});

// =====================================================
// DISK STORAGE FOR VIDEO + 3D MODEL
// =====================================================

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "video") {
      cb(null, videoFolder);
    } else if (file.fieldname === "model3d") {
      cb(null, modelFolder);
    } else {
      cb(
        new Error(
          "Invalid disk upload field"
        )
      );
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

// =====================================================
// CUSTOM STORAGE
// =====================================================
// images -> memory
// video/model3d -> disk
// =====================================================

const storage = {
  _handleFile(req, file, cb) {
    if (file.fieldname === "images") {
      const chunks = [];

      file.stream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      file.stream.on("error", (error) => {
        cb(error);
      });

      file.stream.on("end", () => {
        const buffer = Buffer.concat(chunks);

        cb(null, {
          buffer,
          size: buffer.length,
        });
      });

      return;
    }

    // =================================================
    // VIDEO / 3D MODEL
    // =================================================

    diskStorage._handleFile(req, file, cb);
  },

  _removeFile(req, file, cb) {
    if (file.fieldname === "images") {
      delete file.buffer;
      cb(null);
      return;
    }

    diskStorage._removeFile(req, file, cb);
  },
};

// =====================================================
// FILE VALIDATION
// =====================================================

const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const imageTypes = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ];

  const videoTypes = [
    ".mp4",
    ".webm",
    ".mov",
  ];

  const modelTypes = [
    ".glb",
    ".gltf",
  ];

  // IMAGE
  if (
    file.fieldname === "images" &&
    imageTypes.includes(extension)
  ) {
    return cb(null, true);
  }

  // VIDEO
  if (
    file.fieldname === "video" &&
    videoTypes.includes(extension)
  ) {
    return cb(null, true);
  }

  // 3D MODEL
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

// =====================================================
// MULTER
// =====================================================

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;
