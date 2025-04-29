const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Replace with your OpenRouter API key
const OPENROUTER_API_KEY = "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";

app.post('/generate-meme', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "openai/dall-e-3",
      messages: [{ role: "user", content: `Create a funny meme image for: ${prompt}` }],
    }, {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const memeImageUrl = response.data.choices[0]?.message?.content?.trim();
    res.json({ memeImageUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate meme" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
