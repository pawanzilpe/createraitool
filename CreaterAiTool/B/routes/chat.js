const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: messages,
    });

    res.json(completion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "GPT Error" });
  }
});

module.exports = router;
