const multer = require("multer")
const path = require("path")
const fs = require("fs").promises

const uploadDir = path.join(__dirname, "..", "uploads")

//Create upload directory if not exists
(async () => {
    try {
        await fs.mkdir(uploadDir, { recursive: true })
        console.log("Uploads directory is ready.")
    } catch (error) {
        console.error("Error creatingt upload directory:", error)
    }
})();

//Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    }, 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

//Allowed audio MIME types
const allowedMimeTypes = [
    "audio/wav",
    "audio/mpeg",
    "audio/flac",
    "audio/mp4",
    "audio/x-m4a",
    "audio/m4a",
    "video/mp4"
]

//Multer upload middleware
const upload = multer({
    storage,
    fileFilter:(req, file, cb) => {
        console.log(`File uploaded: ${file.originalname}, MIME type: ${file.mimetype}`);
        if(!allowedMimeTypes.includes(file.mimetype)){
            return cb(new Error("Only WAV, MP3, FLAC, and M4A audio files are allowed"), false)
        }
        cb(null, true)
    }
})

const handleAudioUpload = (req, res) => {
    if(!req.file){
        return res.status(400).json({ error: "File upload failed. Ensure you are uploading a valid audio file."})
    }
    res.json({message: "File uploadd successfully", filePath: req.file.path})
}

module.exports = { upload, handleAudioUpload }