"use client";

import React, { useEffect, useState } from 'react'
import { MockInterview } from '../../../utils/schema'
import { db } from '../../../utils/db'
import { useUser } from '@clerk/nextjs'
import { eq, desc } from 'drizzle-orm'
import InterviewItemCard from './InterviewItemCard'
function InterviewList() {

    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    const GetInterviewList = async () => {
        if (!user) return;

        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id));

        console.log("DATA:", result);
        setInterviewList(result);
    };

    // ✅ CORRECT PLACE
    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Interviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {interviewList.length > 0 ? (
                    interviewList.map((interview, index) => (
                        <InterviewItemCard key={index} interview={interview} />
                    ))
                ) : (
                    <p>No interviews found</p>
                )}
            </div>
        </div>
    )
}

export default InterviewList;