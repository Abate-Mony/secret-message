const express = require('express');
const router = express.Router();
const uploadController = require('../controller/upload-controller');
router.get('/upload-files', uploadController.uploadForm);
router.post('/upload-files', uploadController.uploadFiles);
module.exports = router;