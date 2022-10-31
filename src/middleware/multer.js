const multer = require("multer");
const path = require("path");

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/avatar");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const portoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/portfolio");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const companyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/company");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const maxSize = 5 * 1024 * 1024;

const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
      cb(null, true);
    } else {
      const error = {
        message: "filetype not supported",
      };
      cb(error, false);
    }
  },
  limits: {fileSize: maxSize}
});

const portoUpload = multer({
  storage: portoStorage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
      cb(null, true);
    } else {
      const error = {
        message: "filetype not supported",
      };
      cb(error, false);
    }
  },
  limits: {fileSize: maxSize}
});

const companyUpload = multer({
  storage: companyStorage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
      cb(null, true);
    } else {
      const error = {
        message: "filetype not supported",
      };
      cb(error, false);
    }
  },
  limits: {fileSize: maxSize}
});

module.exports = {
  avatarUpload,
  portoUpload,
  companyUpload
}