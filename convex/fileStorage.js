import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

//generateUploadUrl returns a secure, temporary URL that a client can use to upload a file directly to a designated storage area.

export const AddFileEntryToDb=mutation({
  args:{
    storageId:v.string(),
    fileId:v.string(),
    fileName:v.string(),
    createdBy:v.string(),
    fileUrl:v.string()
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.insert('pdfFiles',{
      fileId:args.fileId,
      fileName:args.fileName,
      storageId:args.storageId,
      createdBy:args.createdBy,
      fileUrl:args.fileUrl
    })
    return 'Inserted in DB'
  }
});

export const getFileUrl=mutation({
  args:{
    storageId:v.string()
  },
  handler:async(ctx,args)=>{
    const url=await ctx.storage.getUrl(args.storageId);
    return url;
  }
})