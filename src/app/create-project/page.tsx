'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuestionnaireNavbar from "@/components/Questionnaire/QuestionnaireNavbar";
import QuestionnaireRadio from "@/components/Questionnaire/QuestionnaireRadio";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { QuestionWithOptions } from "@/types/questionnaire";
import { RadioGroup } from "@/components/ui/radio-group";

export default function CreateProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draft');

  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionWithOptions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionHistory, setQuestionHistory] = useState<Array<{
    questions: QuestionWithOptions[];
    answers: Record<string, string>;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalSteps = 10; // This will be dynamic later

  const currentQuestion = currentQuestions[currentQuestionIndex] || null;
  const selectedAnswer = answers[currentQuestion?.id || ''] || '';

  const progressPercentage = (currentStep / totalSteps) * 100;

  // Load initial question when page loads
  useEffect(() => {
    if (!draftId) {
      router.push('/');
      return;
    }

    loadQuestion();
  }, [draftId]);

  const loadQuestion = async (parentQuestionId?: string, parentOptionId?: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        draftId: draftId!,
      });

      if (parentQuestionId) {
        params.append('parentQuestionId', parentQuestionId);
      }
      if (parentOptionId) {
        params.append('parentOptionId', parentOptionId);
      }

      const response = await fetch(`/api/project-draft/questions?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load question');
      }

      // Load ALL questions from the response
      if (data.questions && data.questions.length > 0) {
        setCurrentQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setAnswers({}); // Reset answers for new set of questions
      } else {
        // No more questions - move to next step
        console.log('No more questions, moving to next step');
      }
    } catch (error) {
      console.error('Error loading question:', error);
      alert('Er is een fout opgetreden bij het laden van de vraag.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (!selectedAnswer || !currentQuestion) return;

    // Save current answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    // Check if there are more questions in current set
    if (currentQuestionIndex < currentQuestions.length - 1) {
      // Move to next question in the same set
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    // All questions in current set answered - check for follow-ups
    // For now, just check the first question's first answer to determine next steps
    const firstQuestion = currentQuestions[0];
    const firstAnswer = newAnswers[firstQuestion.id];
    const selectedOption = firstQuestion.options?.find(opt => opt.id === firstAnswer);

    // Save to history
    setQuestionHistory(prev => [...prev, {
      questions: currentQuestions,
      answers: newAnswers,
    }]);

    // TODO: Save answers to database via API

    // Check if selected option has follow-up questions
    if (selectedOption?.has_follow_up) {
      // Load follow-up questions
      await loadQuestion(firstQuestion.id, selectedOption.id);
    } else {
      // Move to next step (Steps 2-8 are general questions)
      setCurrentStep((prev) => prev + 1);
      // TODO: Load general questions or complete category questions
    }
  };

  const handleBack = () => {
    // If we're not on the first question of the current set, go back within the set
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      return;
    }

    // If we have history, go back to previous set of questions
    if (questionHistory.length > 0) {
      const previous = questionHistory[questionHistory.length - 1];
      setQuestionHistory(prev => prev.slice(0, -1));
      setCurrentQuestions(previous.questions);
      setCurrentQuestionIndex(previous.questions.length - 1); // Go to last question
      setAnswers(previous.answers);
    } else if (currentStep > 1) {
      // Go back to search page
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <TopBar />

      {/* Questionnaire Navbar */}
      <QuestionnaireNavbar />

      {/* Progress Bar */}
      <div className="w-full px-7 pt-12">
        <div className="max-w-[720px] mx-auto">
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-7 py-10">
        <div className="w-full max-w-[720px]">
          {isLoading ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">Laden...</p>
            </div>
          ) : currentQuestion ? (
            <>
              {/* Question Counter */}
              {currentQuestions.length > 1 && (
                <p className="text-center text-sm text-gray-500 mb-4">
                  Vraag {currentQuestionIndex + 1} van {currentQuestions.length}
                </p>
              )}

              {/* Question */}
              <h2 className="text-4xl font-normal leading-10 text-center text-foreground mb-16">
                {currentQuestion.question_text_nl}
              </h2>

              {/* Answer Options */}
              <RadioGroup
                value={selectedAnswer}
                onValueChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
                className="gap-4 mb-12"
              >
                {currentQuestion.options?.map((option) => (
                  <QuestionnaireRadio
                    key={option.id}
                    id={option.id}
                    name="question"
                    value={option.id}
                    label={option.option_label_nl}
                    checked={selectedAnswer === option.id}
                  />
                ))}
              </RadioGroup>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={questionHistory.length === 0 && currentStep === 1}
                  className="text-primary font-medium text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Vorige
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="bg-primary shadow-2xl hover:bg-primary/90 text-white text-xl px-7 py-4 rounded-xl flex items-center gap-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Volgende
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-500">Geen vragen beschikbaar</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
