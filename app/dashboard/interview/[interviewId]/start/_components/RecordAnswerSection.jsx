"use client";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {

  const [isRecording, setIsRecording] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const recognitionRef = useRef(null);
  const hasSavedRef = useRef(false);
  const startTimeRef = useRef(null);
useEffect(() => {
  setUserAnswer("");            // 🧹 clear previous answer
  hasSavedRef.current = false;  // reset save flag
  startTimeRef.current = null;  // reset timer
}, [activeQuestionIndex]);
  // 🎤 START RECORDING
  const startSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Browser not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    startTimeRef.current = Date.now(); // ⏱️ start timer

    recognition.onstart = () => {
      setIsRecording(true);
      hasSavedRef.current = false; // reset
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setUserAnswer(transcript);
    };

    recognition.onerror = () => {
      toast.error("Speech error");
    };

    // ❌ removed auto restart (fix loop)
    recognition.onend = () => {
      console.log("Recording stopped");
    };

    recognition.start();
  };

  // 🛑 STOP RECORDING
  const stopSpeechToText = async () => {
    recognitionRef.current?.stop();
    setIsRecording(false);

    const duration = (Date.now() - startTimeRef.current) / 1000;

    // ⏱️ Minimum 10 sec check
    if (duration <10) {
      toast.error("Answer should be at least 10 seconds long ⏱️");
      return;
    }

    if (hasSavedRef.current) return; // ✅ prevent multiple save
    hasSavedRef.current = true;

    const cleanedAnswer = userAnswer?.trim();

    if (!cleanedAnswer || cleanedAnswer.length < 20) {
      toast.error("Speak proper answer");
      return;
    }

    if (!interviewData?.mockId) {
      toast.error("Mock ID missing ❌");
      return;
    }

    setLoading(true);

    try {
      // 🤖 AI FEEDBACK
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
Answer: ${cleanedAnswer}
Return JSON {rating, feedback}`,
        }),
      });

      const data = await res.json();

      let cleaned = data.data
        ?.replace(/```json/g, "")
        ?.replace(/```/g, "")
        ?.trim();

      let JsonFeedbackResp;

      try {
        JsonFeedbackResp = JSON.parse(cleaned);
      } catch {
        toast.error("AI response error");
        setLoading(false);
        return;
      }

      // 💾 SAVE TO DB (API CALL)
      await fetch("/api/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockId: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAnswer: cleanedAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      toast.success("Answer saved ✅");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // 🔘 BUTTON
  const handleRecord = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center">

      {/* CAMERA */}
      <div className="mt-10 bg-black rounded-lg relative flex justify-center">
        <Image
          src="/3617090.png"
          width={200}
          height={200}
          alt="bg"
          className="absolute opacity-20"
        />

        <Webcam
          mirrored
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleRecord}
        disabled={loading}
        className={`mt-5 px-6 py-2 rounded 
        ${isRecording ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
      >
        {loading
          ? "Processing..."
          : isRecording
          ? "Stop Recording"
          : "Start Recording"}
      </button>

      <p className="mt-2">
        Status: {isRecording ? "Recording 🎤" : "Stopped"}
      </p>

    </div>
  );
}

export default RecordAnswerSection;