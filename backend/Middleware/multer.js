import multer from "multer";
import path from "path";
import fs from "fs";

// Folder to store images
const uploadPath = "Photos";

// Create if doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fieldName = file.fieldname; // e.g. "profile", "bid"
    const ext = path.extname(file.originalname);
    let filename;

    // For profile photo
    if (fieldName === "document_type") {
      filename = `${req.body.name?.toLowerCase() || "user"}-profile${ext}`;
    }

    // For bid photo (pass bidId in body)
    else if (fieldName === "photo") {
      filename = `bid-${req.body.bidId || "unknown"}${ext}`;
    }

    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

export default upload;
