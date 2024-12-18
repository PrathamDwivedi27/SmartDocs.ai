import { mutation, query } from "./_generated/server";
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



export const GetFileRecord=query({
  args:{
    fileId:v.string()
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('fileId'),args.fileId)).collect();
    console.log(result);
    return result[0];
  }
})


export const GetUserFiles=query({
  args:{
    userEmail:v.optional(v.string())
  },
  handler:async(ctx,args)=>{

    if(!args.userEmail){
      return [];
    }

    const result=await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('createdBy'),args.userEmail)).collect();
    return result;
  }
})