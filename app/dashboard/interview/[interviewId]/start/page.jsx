"use client";
import { useParams } from "next/navigation";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import button from "../../../../../components/ui/button";
import Link from "next/link";
// Dynamic import
const RecordAnswerSection = dynamic(
  () => import("./_components/RecordAnswerSection"),
  { ssr: false }
);

function StartInterview() {
  const params = useParams();
  const interviewId = params?.interviewId;

  const [interviewData, setInterviwDetails] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (!interviewId) return;
    getInterviewDetails();
  }, [interviewId]);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);

    setMockInterviewQuestion(jsonMockResp);
    setInterviwDetails(result[0]);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <QuestionsSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
      />

      <RecordAnswerSection 
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
/>
<div className="flex justify-end gap-3 mt-5">
  {activeQuestionIndex>0 && (<button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
    Previous
  </button>
  )}
  {activeQuestionIndex!=mockInterviewQuestion.length-1 && (
    <button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Next
    </button>
  )}
  {activeQuestionIndex === mockInterviewQuestion.length - 1 && interviewData && (
    <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
      <button className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500">
        Finish
      </button>
    </Link>
  )}
</div>
    </div>
    
  );
}

export default StartInterview;