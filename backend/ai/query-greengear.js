const { ChromaClient } = require("chromadb");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chroma = new ChromaClient();

async function main() {
  const question = "Can I return product if it is damaged?";

  // Dobij embedding za pitanje
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const embedding = embeddingResponse.data[0].embedding;

  // Pretraga po vektorskoj bazi
  const collection = await chroma.getCollection({ name: "greengear" });
  const result = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 3,
  });

  console.log("\n🔎 Most relevant sections:");
  for (let i = 0; i < result.documents[0].length; i++) {
    //console.log(`\n📌 Section: ${result.metadatas[0][i].section}`);
    console.log(result.documents[0][i]);
  }
}

main().catch(console.error);
