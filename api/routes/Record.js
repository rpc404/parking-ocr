const express = require("express");

const RecordRouter = express.Router();

const multer = require("multer");
const Tesseract = require("tesseract.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        getExtension(file.originalname)
    );
  },
});

function getExtension(filename) {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedExtensions = /png|jpg|jpeg|gif/; // replace with your desired file extensions
    const fileExtension = getExtension(file.originalname);
    if (!allowedExtensions.test(fileExtension)) {
      cb(new Error("Only " + allowedExtensions + " files are allowed!"));
    } else {
      cb(null, true);
    }
  },
});

RecordRouter.post(
  "/new-parking-record",
  upload.single("numberplateImage"),
  async (req, res) => {
    try {
      console.log(req.file.path);
      Tesseract.recognize(
        req.file.path,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
      })
    } catch (error) {
      console.error(error);
      res.status(500).send("OCR failed");
    }
  }
);

module.exports = RecordRouter;
