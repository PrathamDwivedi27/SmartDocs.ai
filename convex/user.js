import { mutation } from "./_generated/server";
import {v} from "convex/values" 
import {query} from "./_generated/server";
//Mutation is used for creating, updating, or deleting data.

export const createUser=mutation({
    args:{
        email:v.string(),
        userName:v.string(),
        imageUrl:v.string(),
    },
    handler: async (ctx, args) => {
        console.log("Received args:", args);
    
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();
    
        console.log("Existing user query result:", user);
    
        if (user?.length === 0) {
            await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
                upgrade: false,
            });
            console.log("Inserted new user.");
            return 'Inserted New User..';
        }
    
        console.log("User already exists.");
        return 'User Already Exist';
    }
    
})

export const userUpgradePlan = mutation({
    args: {
        userEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.userEmail))
            .collect();
        
        if (result.length > 0) {
            await ctx.db.patch(result[0]._id, { upgrade: true });
            return 'User Upgraded Successfully';
        } else {
            // No user found with the provided email
            return 'User not found';
        }
    }
});

export const GetUserInfo=query({
    args:{
        userEmail:v.optional(v.string()),
    },
    handler:async(ctx,args)=>{
        if(!args?.userEmail){
            return null;
        }
        const result=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args?.userEmail)).collect();
        if(result.length===0){
            return null;
        }
        return result[0];
    }
})
