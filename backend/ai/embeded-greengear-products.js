const fs = require("fs");
require("dotenv").config();
const { OpenAI } = require("openai");
const { ChromaClient } = require("chromadb");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chroma = new ChromaClient();

async function main() {
  const data = JSON.parse(
    fs.readFileSync("./jsons/greengear_product_semantic.json", "utf-8")
  );

  try {
    await chroma.deleteCollection({ name: "greengear_products" });
    console.log("Collections deleted");
  } catch (err) {
    console.error("Error deleting collections:", err);
  }

  const collection = await chroma.getOrCreateCollection({
    name: "greengear_products",
    embeddingFunction: null,
  });

  for (let i = 0; i < data.length; i++) {
    const chunk = data[i];
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk.text,
    });

    await collection.add({
      ids: [`product-${i}`],
      embeddings: [embedding.data[0].embedding],
      metadatas: [{ section: chunk.chunk }],
      documents: [chunk.text],
    });

    console.log(`✅ Added: ${chunk.chunk}`);
  }

  console.log("🎉 Product embedding finished!");
}

main().catch(console.error);
