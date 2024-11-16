"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../convex/_generated/api";

export default function Home() {

  const {user}=useUser();
  const createUser=useMutation(api.user.createUser);
  console.log("Clerk user object:", user);

  const CheckUser = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("User email is missing. Skipping user creation.");
        return;
      }

      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl || '',
        userName: user?.fullName || 'Anonymous',
      });

      console.log("Result from createUser:", result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  

  useEffect(()=>{
    console.log(user);
    user && CheckUser()
  },[user])
  return (
    <div>
      Hello
      console.log(user);
      <UserButton/>
    </div>
  );
}
