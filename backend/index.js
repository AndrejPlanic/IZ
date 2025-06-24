const app = require("./src/app");

const PORT = process.env.PORT;

const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question, contextChunks } = req.body;

    const safeChunks = Array.isArray(contextChunks) ? contextChunks : [];

    const prompt = `Odgovori korisniku:\n\n${safeChunks.join(
      "\n"
    )}\n\nPitanje: ${question}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Odgovaraj tačno i samo na osnovu datih informacija.",
        },
        { role: "user", content: prompt },
      ],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Greška u /api/ask:", error);

    if (error instanceof OpenAI.APIError) {
      console.error(
        "📛 OpenAI API greška:",
        error.status,
        error.message,
        error.code
      );
      res.status(500).json({
        error: "Greška pri kontaktiranju OpenAI API-ja.",
        status: error.status,
        message: error.message,
        code: error.code,
      });
    } else {
      res.status(500).json({
        error: "Nepoznata greška na serveru.",
        message: error.message,
      });
    }
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
