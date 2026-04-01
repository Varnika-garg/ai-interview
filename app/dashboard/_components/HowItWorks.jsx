"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function HowItWorks() {
  const router = useRouter();

  const slides = [
    {
      image: "/slide1.png",
      title: "Add New Interview",
      desc: "Fill job position, tech stack, and experience. AI generates random questions for you automatically. This helps you practice a wide range of questions without manually curating them.",
    },
    {
      image: "/slide2.png",
      title: "Start Interview",
      desc: "Answer the interview questions one by one in a simulated environment. This helps build confidence and timing for real interviews. You can submit your answers when done.",
    },
    {
      image: "/slide3.png",
      title: "Review Results",
      desc: "View your submitted answers alongside the correct answers. You’ll also get detailed feedback and ratings to understand your strengths and areas to improve.",
    },
    {
      image: "/slide4.png",
      title: "Track Progress",
      desc: "Keep track of all your past interviews and see your improvement over time. Identify patterns in your performance and focus on weaker areas.",
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-gradient bg-clip-text text-transparent from-indigo-500 to-pink-500">
          How It Works
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Our AI-powered mock interview platform is designed to help you practice efficiently, track your progress, and improve your interview skills step by step.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          el: "#custom-pagination",
          clickable: true,
        }}
        navigation
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        className="py-8"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center space-y-6 transition-transform duration-500 hover:scale-105">
              <div className="bg-white p-4 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-2xl w-full max-w-3xl h-64 md:h-80 object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-indigo-600">{slide.title}</h2>
              <p className="text-gray-700 text-center max-w-xl text-md md:text-lg px-4">
                {slide.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Back Button and Pagination Dots */}
      <div className="text-center mt-8">
        {/* Back to Dashboard Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
        >
          Back to Dashboard
        </button>

        {/* Pagination Dots */}
        <div
          id="custom-pagination"
          className="flex justify-center mt-6 space-x-2"
        ></div>

        {/* Inline styles for custom Swiper dots */}
        <style jsx>{`
          #custom-pagination .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
            background-color: #cbd5e1; /* Tailwind gray-300 */
            opacity: 1;
            border-radius: 9999px;
            transition: all 0.3s;
          }
          #custom-pagination .swiper-pagination-bullet-active {
            background-color: #6366f1; /* Tailwind indigo-500 */
            transform: scale(1.3);
          }
        `}</style>
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-500 mt-6 text-sm">
        Designed to make interview prep simple and effective
      </p>
    </div>
  );
}