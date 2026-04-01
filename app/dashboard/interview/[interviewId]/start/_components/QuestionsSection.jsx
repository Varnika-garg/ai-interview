import React from 'react'
import { Lightbulb, SpeakerHigh } from "@phosphor-icons/react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

  const textToSpeech = (text) => {
    if (!text) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);

      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        speech.voice = voices[0];
      }

      window.speechSynthesis.speak(speech);

      console.log("🔊 Speaking:", text);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-6'>

      {/* Question Number Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto'>
        
        {mockInterviewQuestion.map((q, index) => (
          <h2
            key={index}
            className={`p-3 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all font-medium
              ${activeQuestionIndex === index 
                ? "bg-blue-200 text-blue-800"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            Question {index + 1}
          </h2>
        ))}

      </div>

     <div className="mt-4 bg-gray-50 p-3 rounded-lg">
  
  <h2 className="text-md md:text-lg leading-relaxed flex flex-wrap items-center gap-2">
    
    {mockInterviewQuestion[activeQuestionIndex]?.question}

    <SpeakerHigh
      size={26}
      weight="fill"
      className="cursor-pointer text-blue-600 hover:text-blue-800 transition ml-auto"
      onClick={() =>
        textToSpeech(
          mockInterviewQuestion[activeQuestionIndex]?.question
        )
      }
    />

  </h2>

</div>

      {/* Note Section */}
      <div className='border rounded-lg p-4 bg-blue-100 mt-4'>
        
        <h2 className='flex gap-2 items-center text-primary mb-2'>
          <Lightbulb size={20} className="text-yellow-500" />
          <strong>Note:</strong>
        </h2>

        <h2 className='text-sm text-primary leading-relaxed'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>

      </div>

    </div>
  )
}

export default QuestionsSection