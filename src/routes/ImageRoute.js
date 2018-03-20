var express = require('express');
var router = express.Router();
var path = require('path');
var ImageController = require('../controller/ImageController');
var AuthController = require('../controller/AuthController');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });

router.post('/', AuthController.authorize, upload.any(), ImageController.create);

router.delete('/', ImageController.destroy);

module.exports = router;