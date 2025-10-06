'use client';
import { useState } from "react";
import QuestionnaireNavbar from "@/components/Questionnaire/QuestionnaireNavbar";
import QuestionnaireRadio from "@/components/Questionnaire/QuestionnaireRadio";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const totalSteps = 10; // Example total steps

  // Mock question data
  const question = {
    id: 1,
    text: "Wat voor type opdracht zoek je?",
    options: [
      { id: "1", value: "nieuwbouw", label: "Nieuwbouw ontwerp" },
      { id: "2", value: "verbouwing", label: "Verbouwing / renovatie" },
      { id: "3", value: "aanbouw", label: "Aanbouw / uitbouw" },
      { id: "4", value: "interieur", label: "Interieurontwerp" },
      { id: "5", value: "vergunningen", label: "Vergunningen / advies" },
    ],
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (selectedAnswer) {
      setCurrentStep((prev) => prev + 1);
      setSelectedAnswer("");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setSelectedAnswer("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <TopBar />

      {/* Questionnaire Navbar */}
      <QuestionnaireNavbar />

      {/* Progress Bar */}
      <div className="w-full px-7 pt-6">
        <div className="max-w-[680px] mx-auto">
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-7 py-12">
        <div className="w-full max-w-[680px]">
          {/* Question */}
          <h1 className="text-3xl font-semibold text-center text-foreground mb-12">
            {question.text}
          </h1>

          {/* Answer Options */}
          <div className="space-y-4 mb-12">
            {question.options.map((option) => (
              <QuestionnaireRadio
                key={option.id}
                id={option.id}
                name="question"
                value={option.value}
                label={option.label}
                checked={selectedAnswer === option.value}
                onChange={setSelectedAnswer}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="text-primary font-medium text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Vorige
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-primary hover:bg-primary/90 text-white font-medium text-base px-8 py-6 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Volgende
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
