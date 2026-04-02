"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {

    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

   
const GetInterviewList = async () => {
    if (!user) return;

    try {
        const res = await fetch(
            `/api/get-interview?email=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress)}`
        );

        const data = await res.json();

        setInterviewList(data);

    } catch (error) {
        console.error("Error fetching interviews:", error);
    }
};
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