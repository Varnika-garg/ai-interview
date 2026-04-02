"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Lightbulb } from "@phosphor-icons/react";
import Link from "next/link";

export default function InterviewPage() {
  const params = useParams();
  const interviewId = params.interviewId;

  const [interviewDetails, setInterviewDetails] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewId) return;

    const getInterviewDetails = async () => {
      try {
        // ✅ CALL API INSTEAD OF DB
        const res = await fetch(`/api/get-interview?mockId=${interviewId}`);
        const data = await res.json();

        if (!data) {
          setError("No interview found");
        } else {
          setInterviewDetails(data);
        }

      } catch (err) {
        console.error("Error fetching interview:", err);
        setError("Failed to fetch interview details");
      } finally {
        setLoading(false);
      }
    };

    getInterviewDetails();
  }, [interviewId]);

  if (loading) return <p>Loading interview details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl mb-6">Let's Get Started</h2>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6">

          <div className="flex flex-col p-5 rounded-lg border gap-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold">
              Job Role/Job Position: {interviewDetails?.jobPosition || "Not specified"}
            </h2>

            <p>Job Description: {interviewDetails?.jobDesc || "Not specified"}</p>
            <p>Experience Required: {interviewDetails?.jobExperience || "Not specified"}</p>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">
            <h2 className="flex gap-2 items-center text-yellow-500 font-semibold">
              <Lightbulb /> Information
            </h2>
            <p>{process.env.NEXT_PUBLIC_INFORMATION || "No additional information."}</p>
          </div>

          <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/' + interviewId + '/start'}>
              <button className="px-6 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark transition-colors w-max">
                Start
              </button>
            </Link>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col items-center">
          {cameraOn ? (
            <Webcam mirrored={true} style={{ height: 350, width: "100%", maxWidth: 400 }} />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-secondary rounded-lg p-6 flex justify-center items-center">
                <CameraIcon className="h-72 w-80 text-white" />
              </div>

              <div className="flex justify-end w-full">
                <button
                  className="h-10 w-full hover:bg-gray-200 rounded-2xl"
                  onClick={() => setCameraOn(true)}
                >
                  Enable Web Cam and Microphone
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}