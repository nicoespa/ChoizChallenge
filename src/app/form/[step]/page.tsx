"use client";
import { useRouter, useParams } from "next/navigation";
import { questions } from "@/lib/questions";
import { useFormContext } from "@/context/FormContext";
import QuestionCard from "@/components/QuestionCard";
import { useState } from "react";

export default function StepPage() {
  const router = useRouter();
  const { step } = useParams() as { step: string };
  const stepIndex = parseInt(step);
  const { answers, setAnswer } = useFormContext();
  const question = questions[stepIndex];
  const [otherValue, setOtherValue] = useState("");

  if (!question) {
    router.push("/");
    return null;
  }

  const handleNext = () => {
    if (stepIndex < questions.length - 1) {
      router.push(`/form/${stepIndex + 1}`);
    } else {
      router.push("/result");
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) router.push(`/form/${stepIndex - 1}`);
    else router.push("/welcome");
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center text-gray-800"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="text-lg font-semibold text-gray-800">Choiz</div>
        
        <div className="w-8 h-8 flex items-center justify-center text-gray-800">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="h-0.5 bg-gray-200 rounded-full">
          <div 
            className="h-0.5 bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="px-4 pb-24">
        <QuestionCard
          question={question.question}
          options={question.options}
          type={question.type}
          value={answers[question.id]}
          onChange={(val) => setAnswer(question.id, val)}
          otherValue={otherValue}
          onOtherChange={setOtherValue}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button
          onClick={handleNext}
          className="w-full bg-[#292929] text-white py-4 rounded-[48px] font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!answers[question.id] || (Array.isArray(answers[question.id]) && answers[question.id].length === 0)}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
