"use client";

import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../../../components/ui/collapsible.jsx";
import { useParams } from "next/navigation";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq, asc } from "drizzle-orm";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
export default function FeedbackPage() {
  const params = useParams();
  const { interviewId } = params;
  const router=useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!interviewId) return;

    const fetchFeedback = async () => {
      try {
        const data = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockId, interviewId))
          .orderBy(asc(UserAnswer.id));

        setFeedbackList(data);
      } catch (err) {
        console.error("DB fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [interviewId]);

  if (!interviewId) {
    return (
      <div className="p-10">
        <h2 className="text-3xl font-bold text-red-500">
          Interview ID not provided
        </h2>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-6">
      <h2 className="text-3xl font-bold text-green-500">
        🎉 Congratulations!
      </h2>
      <h2 className="font-bold text-2xl">
        Here is your interview feedback
      </h2>

      {loading ? (
        <p>Loading feedback...</p>
      ) : feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <Collapsible key={index}>
            {/* Question */}
            <CollapsibleTrigger className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 font-semibold shadow-sm">
              {item.question || `Question ${index + 1}`}
            </CollapsibleTrigger>

            {/* Content */}
            <CollapsibleContent className="p-5 border-l-4 border-blue-500 bg-gray-50 rounded-lg space-y-4 shadow-sm">
              
              {/* Your Answer */}
              <div className="p-3 rounded-md bg-red-100 border border-red-300">
                <p className="text-sm text-gray-600 mb-1">Your Answer</p>
                <p className="text-red-700 font-medium">
                  {item.userAnswer}
                </p>
              </div>

              {/* Correct Answer */}
              <div className="p-3 rounded-md bg-blue-100 border border-blue-300">
                <p className="text-sm text-gray-600 mb-1">Correct Answer</p>
                <p className="text-blue-700 font-medium">
                  {item.correctAns}
                </p>
              </div>

              {/* Feedback */}
              <div className="p-3 rounded-md bg-white border">
                <p className="text-sm text-gray-600 mb-1">Feedback</p>
                <p className="text-gray-800">{item.feedback}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rating:</span>
                
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        star <= item.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  ({item.rating}/5)
                </span>
              </div>

            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-gray-500">No feedback found.</p>
      )}
      <Button onClick={()=>router.replace('/dashboard')} variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
        Go Home
      </Button>
    </div>
  );
}