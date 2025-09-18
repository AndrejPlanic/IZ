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

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

async function mcpRetrieveDocuments(question, topK = 5) {
  const questionEmbeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });
  const questionEmbedding = questionEmbeddingResponse.data[0].embedding;

  const [infoCollection, productCollection] = await Promise.all([
    chroma.getCollection({ name: "greengear" }),
    chroma.getCollection({ name: "greengear_products" }),
  ]);

  const [infoResults, productResults] = await Promise.all([
    infoCollection.query({
      queryEmbeddings: [questionEmbedding],
      nResults: 10,
      include: ["documents"],
    }),
    productCollection.query({
      queryEmbeddings: [questionEmbedding],
      nResults: 10,
      include: ["documents"],
    }),
  ]);

  const docs = [
    ...(infoResults.documents?.[0] || []),
    ...(productResults.documents?.[0] || []),
  ];

  const scoredDocs = [];

  for (const doc of docs) {
    const genResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are given a document chunk. Try to infer what question it could be answering.",
        },
        {
          role: "user",
          content: `Document:\n${doc}\n\nGenerate a likely user question this document answers.`,
        },
      ],
    });

    const generatedQuestion = genResponse.choices[0].message.content;

    const genEmbedResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: generatedQuestion,
    });

    const genEmbedding = genEmbedResponse.data[0].embedding;
    const similarity = cosineSimilarity(questionEmbedding, genEmbedding);

    scoredDocs.push({ doc, similarity });
  }

  scoredDocs.sort((a, b) => b.similarity - a.similarity);
  return scoredDocs.slice(0, topK).map((d) => d.doc);
}

async function getAnswerFromEmbedding(embedding, question) {
  const infoCollection = await chroma.getCollection({ name: "greengear" });
  const productCollection = await chroma.getCollection({
    name: "greengear_products",
  });

  const [infoResult, productResult] = await Promise.all([
    infoCollection.query({ queryEmbeddings: [embedding], nResults: 5 }),
    productCollection.query({ queryEmbeddings: [embedding], nResults: 5 }),
  ]);

  const infoChunks = infoResult.documents?.[0] || [];
  const productChunks = productResult.documents?.[0] || [];

  const allChunks = [...infoChunks, ...productChunks];
  const prompt = `Answer the user using only the following context:\n\n${allChunks.join(
    "\n\n"
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

  return response.choices[0].message.content;
}

//DIRECT RETRIEVAL
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });

    const embedding = embeddingResponse.data[0].embedding;
    const answer = await getAnswerFromEmbedding(embedding, question);

    res.json({ answer });
  } catch (error) {
    console.error("❌ Error in /api/ask:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

//HYDE RETRIEVAL
app.post("/api/ask-hyde", async (req, res) => {
  try {
    const { question } = req.body;

    const hypotheticalAnswer = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Generate a short, informative answer to the user's question. This answer will be used to retrieve relevant documents.",
        },
        { role: "user", content: question },
      ],
    });

    const generatedAnswer = hypotheticalAnswer.choices[0].message.content;
    console.log("🤖 HyDE generated answer:", generatedAnswer);

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: generatedAnswer,
    });

    const embedding = embeddingResponse.data[0].embedding;
    const answer = await getAnswerFromEmbedding(embedding, question);

    res.json({ answer });
  } catch (error) {
    console.error("❌ Error in /api/ask-hyde:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

// MCP RETRIEVAL
app.post("/api/ask-mcp", async (req, res) => {
  try {
    const { question } = req.body;

    const topDocs = await mcpRetrieveDocuments(question, 5);
    const prompt = `Answer the user using only the following context:\n\n${topDocs.join(
      "\n\n"
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
    console.error("❌ Error in /api/ask-mcp:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
