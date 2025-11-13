import multer from "multer";
import path from "path";
import fs from "fs";

// Folder to store images
const bidPath = "Photos/Bids";
const docPath = "Photos/Bid Documents";

// Create if doesn't exist
[bidPath, docPath].forEach((dir)=> {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, {recursive: true});
  }
})

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if(file.fieldname === "document_type"){
      cb(null, docPath);
    } else{
      cb(null, bidPath)
    }

  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const title = req.body.title?.toLowerCase().replace(/\s+/g, "-") || "bid";
    
    let filename;

    // For Bid photos
    if (file.fieldname === "document_type") {
      filename = `${title}-doc-${file.fieldname}-${ext}`
    } else {
      filename = `${title}-${file.fieldname}-${ext}`
    }

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "document_type") {
    // allow both PDFs and images for docs
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image or PDF files are allowed for documents!"), false);
    }
  } else {
    // images only for bid photos
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed for bid photos!"), false);
    } else {
      cb(null, true);
    }
  }
};

const upload = multer({ storage, fileFilter });


export default upload;
