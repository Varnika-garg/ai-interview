import { Button } from "../../../components/ui/button";
import React, { use } from "react";
import { useRouter } from "next/navigation";
function InterviewItemCard({ interview }) {
    const router=useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedback=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
    return (
        <div className="p-5 border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white">
            
            {/* Job Title */}
            <h2 className="font-semibold text-lg text-blue-600 mb-1">
                {interview.jobPosition}
            </h2>

            {/* Experience */}
            <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Experience:</span> {interview.jobExperience} years
            </p>

            {/* Date */}
            <p className="text-xs text-gray-400">
                Created At: {interview.createdAt}
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-5 mt-4">
    <Button 
        size="sm" 
        variant="outline" 
        className="text-sm" onClick={onFeedback}
    >
        Feedback
    </Button>

    <Button 
        size="sm" 
        className="text-sm bg-blue-500 hover:bg-blue-600 text-white"onClick={onStart}
    >
        Start
    </Button>
</div>
        </div>
    );
}

export default InterviewItemCard;