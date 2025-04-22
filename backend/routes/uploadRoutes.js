const express = require("express")
const router = express.Router()
const { upload, handleAudioUpload } = require("../controllers/uploadController")

router.post("/upload-audio", upload.sing("audioFile"), handleAudioUpload)

module.exports = router;