const express = require("express");

const RecordRouter = express.Router();

const multer = require("multer");
const Tesseract = require("tesseract.js");

const upload = multer({
  dest: "uploads/", // directory to store uploaded files
  limits: {
    fileSize: 1024 * 1024 * 50, // maximum file size (in bytes)
  },
});
RecordRouter.post(
  "/new-parking-record",
  upload.single("numberplateImage"),
  async (req, res) => {
    try {
      const result = await Tesseract.recognize(req.file.path, {
        lang: "nep",
      });

      console.log(result.text);
    } catch (error) {
      console.error(error);
      res.status(500).send("OCR failed");
    }
  }
);

module.exports = RecordRouter;
