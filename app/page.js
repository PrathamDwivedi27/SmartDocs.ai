"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const router = useRouter();

  const handleCreateUser = async () => {
    setIsCreatingUser(true);
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("User email is missing. Skipping user creation.");
        return;
      }
      await createUser({
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl || "",
        userName: user.fullName || "Anonymous",
      });
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsCreatingUser(false);
    }
  };

  // useEffect(() => {
  //   if (user && !isCreatingUser) {
  //     handleCreateUser();
  //   }
  // }, [user, isCreatingUser]);

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      redirect("/sign-in");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 min-h-screen">
      <header className="py-8 px-4 flex justify-between items-center">
        <img src="/logo.svg" alt="Logo" width={150} height={150} />
        <nav className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">Features</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Solution</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Testimonials</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
          <UserButton />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Simplify <span className="text-red-500">PDF</span>{" "}
            <span className="text-blue-500">Note-Taking</span> with AI-Powered
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Elevate your note-taking experience with our AI-powered PDF app.
            Seamlessly extract key insights, summaries, and annotations from any
            PDF with just a few clicks.
          </p>
          <button
            onClick={handleGetStarted}
            disabled={isCreatingUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            {isCreatingUser ? "Creating user..." : "Get Started"}
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              The lowest price
            </h3>
            <p className="text-gray-600">Our solution offers unbeatable value without compromising on quality. Get premium features at a fraction of the cost.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              The fastest on the market
            </h3>
            <p className="text-gray-600">Experience lightning-fast performance designed to keep up with your needs, delivering results faster than any competitor.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              The most loved
            </h3>
            <p className="text-gray-600">Trusted and adored by thousands of users for our reliability, ease of use, and exceptional customer support.</p>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 border border-gray-200 rounded shadow">
              <p className="text-gray-600">"SmartDocs.ai has revolutionized my PDF workflow! It's so efficient and easy to use."</p>
              <p className="text-gray-500 text-right mt-2"> - John Doe</p>
            </div>
            <div className="p-4 border border-gray-200 rounded shadow">
              <p className="text-gray-600">"I love the AI-powered features.  It saves me hours of time each week."</p>
              <p className="text-gray-500 text-right mt-2"> - Jane Smith</p>
            </div>
            <div className="p-4 border border-gray-200 rounded shadow">
              <p className="text-gray-600">"SmartDocs.ai is a lifesaver for students!  It helps me take organized notes so much faster."</p>
              <p className="text-gray-500 text-right mt-2"> - Peter Jones</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-4 text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} SmartDocs.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}