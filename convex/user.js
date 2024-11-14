import { mutation } from "./_generated/server";
import {v} from "convex/values" 
//Mutation is used for creating, updating, or deleting data.

export const createUser=mutation({
    args:{
        email:v.string(),
        userName:v.string(),
        imageUrl:v.string()
    },
    handler:async (ctx,args)=>{
        //if user already exist
        const user=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect()


        //if user does not exist
        if(user?.length===0){
            await ctx.db.insert('users',{
                email:args.email,
                userName:args.userName,
                imageUrl:args.imageUrl
            });
            return 'Inserted New User..'
        }
        return 'User Already Exist'
    }
})