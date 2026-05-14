const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // 🔥 Ask AI to generate table data in JSON format
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate Excel table data in pure JSON array format. No explanation. Only JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiText = completion.choices[0].message.content;

    let jsonData;

    try {
      jsonData = JSON.parse(aiText);
    } catch (err) {
      return res.status(500).json({
        message: "AI did not return valid JSON. Try again.",
      });
    }

    // 📊 Create Excel Workbook
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const filePath = "generated.xlsx";

    XLSX.writeFile(workbook, filePath);

    // 📥 Send file to frontend
    res.download(filePath);
  } catch (error) {
    console.error("Excel AI Error:", error);
    res.status(500).json({ message: "Excel generation failed" });
  }
});

module.exports = router;
