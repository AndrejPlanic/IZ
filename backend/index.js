const app = require("./src/app");
const { ChromaClient } = require("chromadb");
const chroma = new ChromaClient();
const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");

const PORT = process.env.PORT;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    // 1. Dobij embedding pitanja
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 2. Pretraži vektorsku bazu
    const collection = await chroma.getCollection({ name: "greengear" });
    const result = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 3,
    });

    const contextChunks = result.documents[0]; // uzimamo top 3 sekcije

    // 3. Kreiraj prompt sa relevantnim kontekstom
    const prompt = `Answer user:\n\n${contextChunks.join(
      "\n"
    )}\n\nQuestion: ${question}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Answer correctly and only based on the given information",
        },
        { role: "user", content: prompt },
      ],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error in /api/ask:", error);

    if (error instanceof OpenAI.APIError) {
      res.status(500).json({
        error: "Error contaction OpenAI API.",
        status: error.status,
        message: error.message,
        code: error.code,
      });
    } else {
      res.status(500).json({
        error: "Unknowns error on server.",
        message: error.message,
      });
    }
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
