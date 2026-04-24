"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "../../../components/ui/dialog";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import Interview from "../interview/[interviewId]/page";
import QuestionsSection from "../interview/[interviewId]/start/_components/QuestionsSection";

function AddNewInterview() {

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const { user } = useUser();
  const router = useRouter();
const [openDialog, setOpenDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const prompt = `
You are an interviewer.

Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} technical interview questions 
for a ${jobPosition}.

Tech Stack: ${jobDesc}
Experience: ${jobExperience} years

IMPORTANT RULES (STRICT):
- Answer MUST be maximum 20 words
- Answer MUST be 1-2 lines only
- Do NOT explain
- Do NOT give paragraphs
- If answer is long, shorten it

Return ONLY JSON:

[
 {
  "question": "Interview question",
  "answer": "Short answer under 20 words"
 }
]
`;

      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

// ✅ API error handle karo
if (!data.data) {
  console.error("API Error:", data);
  toast.error(data.error || "Failed to generate questions");
  setLoading(false);
  return;
}

// ✅ Safe cleaning
const cleaned = data.data.replace(/```json|```/g, "").trim();

// ✅ Safe JSON parse
let jsonData;
try {
  jsonData = JSON.parse(cleaned);
} catch (err) {
  console.error("JSON parse error:", err);
  toast.error("Invalid AI response");
  setLoading(false);
  return;
}

      // 🔥 CLEAN + SHORTEN ANSWERS
      const finalData = jsonData.map((item) => ({
        ...item,
        answer: item.answer
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .replace(/\n/g, " ")
          .split(" ")
          .slice(0, 25)
          .join(" ")
      }));

      setJsonResponse(finalData);

      if (finalData) {
    const saveRes = await fetch("/api/save-interview", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jobPosition,
    jobDesc,
    jobExperience,
    jsonMockResp: finalData,
    createdBy: user?.primaryEmailAddress?.emailAddress,
  }),
});

const resp = await saveRes.json();

if (resp?.mockId) {
  setOpenDialog(false);
  router.push('/dashboard/interview/' + resp.mockId);
}
      } else {
        console.log("ERROR");
      }

      toast.success("Interview Created!");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
  <div
    className="p-10 border rounded-lg bg-gray-100 hover:scale-105 hover:shadow-md cursor-pointer"
    onClick={() => setOpenDialog(true)}
  >
    <h2 className="font-bold text-lg text-center">+ Add New</h2>
  </div>
</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Tell us more about your job interviewing
          </DialogTitle>
          <DialogDescription>
            Add details about your job position, description and years of experience.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>

          <div>
            <label>Job Role / Job Position</label>
            <Input
              placeholder="Ex. Software Engineer"
              required
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>

          <div>
            <label>Job Description / Tech Stack</label>
            <Textarea
              placeholder="Ex. React, Node, MySQL"
              required
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>

          <div>
            <label>Years of Experience</label>
            <Input
              type="number"
              placeholder="Ex. 5"
              required
              onChange={(e) => setJobExperience(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Generating
                </>
              ) : (
                "Start Interview"
              )}
            </Button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewInterview;