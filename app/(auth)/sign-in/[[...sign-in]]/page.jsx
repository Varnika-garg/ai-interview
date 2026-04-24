"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left side image (desktop) */}
      <div className="relative hidden md:flex">
        <Image
          src="/ai-interview.jpg"
          alt="AI Interview"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-10">
          <h1 className="text-4xl font-bold mb-4">AI Mock Interview</h1>
          <p className="max-w-md text-lg">
            Practice real interview questions powered by AI and boost your confidence.
          </p>
        </div>
      </div>

      {/* Right side login */}
      <div className="relative flex items-center justify-center p-6 md:p-10">

        {/* Mobile background image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/ai-interview.jpg"
            alt="AI Interview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Login card */}
        <div className="relative w-full max-w-md bg-white md:bg-transparent p-6 rounded-xl shadow-lg md:shadow-none">
          <SignIn afterSignInUrl="/dashboard" />
        </div>

      </div>
    </div>
  );
}