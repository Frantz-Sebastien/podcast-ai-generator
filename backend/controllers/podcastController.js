const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY);

async function generatePodcast(req, res) {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'prompt' field." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const conversationPodcast = `Write a podcast where two hosts (you can name the hosts) discuss the following topic: "${prompt}". One of the hosts should be curious asking questions, and the other should be knowledgeable when answering. The conversation should feel natural and engaging. Do not include any asterisk.`;

    const result = await model.generateContent(conversationPodcast);

    if (!result?.response?.candidates?.length) {
      return res.status(500).json({ error: "Unexpected response from AI model." });
    }

    const generatedText = result.response.candidates[0].content.parts.map(p => p.text).join("\n");

    res.json({ success: true, generatedText });
  } catch (error) {
    console.error("Error generating podcast:", error);
    res.status(500).json({ error: "Failed to generate podcast content." });
  }
}

module.exports = { generatePodcast };
