
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import {v} from "convex/values";

export const ingest = action({
  args: {
    splitText:v.any(),
    fileId:v.string()
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,       //Array
      { fileId: args.fileId },          //string
      
      new GoogleGenerativeAIEmbeddings({
        apiKey:"AIzaSyDgK23jjTlgaQYlybUy49eNsgoluDGEZBc",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return 'Completed embedding'
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(new GoogleGenerativeAIEmbeddings({
      apiKey: "AIzaSyDgK23jjTlgaQYlybUy49eNsgoluDGEZBc",
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    }), { ctx });

    console.log("Search Query:", args.query);
    console.log("Searching for fileId:", args.fileId);

    const resultOne = await vectorStore.similaritySearch(args.query, 1);
    console.log("Raw Similarity Search Results:", resultOne);

    const filteredResults = resultOne.filter(q => q.metadata.fileId == args.fileId);
    console.log("Filtered Results:", filteredResults);

    return JSON.stringify(filteredResults);
  },
});
