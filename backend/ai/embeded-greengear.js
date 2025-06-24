const fs = require("fs");
require("dotenv").config();
const { OpenAI } = require("openai");
const { ChromaClient } = require("chromadb");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chroma = new ChromaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("greengear_chunks.json", "utf-8"));
  const collection = await chroma.getOrCreateCollection({
    name: "greengear",
    embeddingFunction: null,
  });

  for (let i = 0; i < data.length; i++) {
    const chunk = data[i];
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk.text,
    });

    await collection.add({
      ids: [`chunk-${i}`],
      embeddings: [embedding.data[0].embedding],
      metadatas: [{ section: chunk.section }],
      documents: [chunk.text],
    });

    console.log(`✅ Added: ${chunk.section}`);
  }

  console.log("🎉 Finished!");
}

main().catch(console.error);
