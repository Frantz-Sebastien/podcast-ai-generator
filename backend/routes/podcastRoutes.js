const express = require("express");
const router = express.Router();
const { generatePodcast } = require("../controllers/podcastController");

router.post("/generate-podcast", generatePodcast)

module.exports = router;