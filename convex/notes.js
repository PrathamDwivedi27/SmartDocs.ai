import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const AddNotes=mutation({
    args:{
        fileId:v.string(),
        notes:v.string(),
        createdBy:v.string(),
    },
    handler:async(ctx,args)=>{
        const record=await ctx.db.query('notes')
        .filter((q)=>q.eq(q.field('fileId'),args.fileId)).collect();

        //if not exists
        if(record.length===0){
            return ctx.db.insert('notes',{
                fileId:args.fileId,
                notes:args.notes,
                createdBy:args.createdBy,
            })
        }
        //if already something is there update to new document
        else{
            return ctx.db.patch(record[0]._id,{
                notes:args.notes,
            })
        }
    }
})