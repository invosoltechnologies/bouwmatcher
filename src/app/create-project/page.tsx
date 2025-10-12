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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhotoUploadModal from "@/components/Questionnaire/PhotoUploadModal";
import OTPVerification from "@/components/Questionnaire/OTPVerification";

export default function CreateProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draft');

  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionWithOptions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [allAnswers, setAllAnswers] = useState<Record<string, string>>({}); // Track all answers across steps
  const [questionHistory, setQuestionHistory] = useState<Array<{
    step: number;
    questions: QuestionWithOptions[];
    answers: Record<string, string>;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const totalSteps = 8;

  const currentQuestion = currentQuestions[currentQuestionIndex] || null;
  const selectedAnswer = answers[currentQuestion?.id || ''] || '';

  const progressPercentage = (currentStep / totalSteps) * 100;

  // Load initial question when page loads
  useEffect(() => {
    if (!draftId) {
      router.push('/');
      return;
    }

    loadQuestionsForStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftId]);

  const loadQuestionsForStep = async (step: number, parentOptionId?: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        draftId: draftId!,
      });

      if (step === 1) {
        // Step 1: Category-specific questions
        // No additional params needed, API defaults to root questions
      } else if (step === 7 && parentOptionId) {
        // Step 7: Conditional contact fields based on request type
        params.append('stepNumber', step.toString());
        params.append('parentOptionId', parentOptionId);
      } else if (step >= 2 && step <= 8) {
        // Steps 2-8: General questions
        params.append('stepNumber', step.toString());
      }

      const response = await fetch(`/api/project-draft/questions?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load questions');
      }

      if (data.questions && data.questions.length > 0) {
        setCurrentQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setAnswers({}); // Reset answers for new step
      } else {
        // No questions for this step, move to next
        console.log(`No questions for step ${step}, moving to next`);
        if (step < totalSteps) {
          setCurrentStep(step + 1);
          loadQuestionsForStep(step + 1);
        }
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Er is een fout opgetreden bij het laden van de vragen.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFollowUpQuestions = async (parentQuestionId: string, parentOptionId: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        draftId: draftId!,
        parentQuestionId,
        parentOptionId,
      });

      const response = await fetch(`/api/project-draft/questions?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load follow-up questions');
      }

      if (data.questions && data.questions.length > 0) {
        setCurrentQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setAnswers({});
      } else {
        // No follow-up questions, move to next step
        moveToNextStep();
      }
    } catch (error) {
      console.error('Error loading follow-up questions:', error);
      alert('Er is een fout opgetreden.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswer = async (questionId: string, optionId?: string, textAnswer?: string) => {
    try {
      const response = await fetch('/api/project-draft/save-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draftId,
          questionId,
          selectedOptionId: optionId,
          answerText: textAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save answer');
      }
    } catch (error) {
      console.error('Error saving answer:', error);
      // Don't block user, just log the error
    }
  };

  const saveAllCurrentAnswers = async () => {
    setIsSaving(true);
    try {
      await Promise.all(
        Object.entries(answers).map(([questionId, answer]) => {
          const question = currentQuestions.find(q => q.id === questionId);
          if (!question) return Promise.resolve();

          // Determine if answer is option ID or text
          if (question.question_type === 'radio' || question.question_type === 'checkbox') {
            return saveAnswer(questionId, answer);
          } else {
            return saveAnswer(questionId, undefined, answer);
          }
        })
      );
    } catch (error) {
      console.error('Error saving answers:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const moveToNextStep = async () => {
    // Save all answers from current step
    await saveAllCurrentAnswers();

    // Merge current answers into all answers
    setAllAnswers(prev => ({ ...prev, ...answers }));

    // Save to history
    setQuestionHistory(prev => [...prev, {
      step: currentStep,
      questions: currentQuestions,
      answers,
    }]);

    const nextStep = currentStep + 1;

    if (nextStep > totalSteps) {
      // All steps completed
      alert('Formulier voltooid!');
      return;
    }

    setCurrentStep(nextStep);

    // Special handling for Step 7 (conditional based on Step 2)
    if (nextStep === 7) {
      const requestTypeAnswer = allAnswers['q-general-request-type'];
      if (requestTypeAnswer) {
        await loadQuestionsForStep(7, requestTypeAnswer);
      } else {
        await loadQuestionsForStep(7);
      }
    } else {
      await loadQuestionsForStep(nextStep);
    }
  };

  const handleNext = async () => {
    if (!currentQuestion) return;

    // Validate answer
    if (currentQuestion.is_required && !selectedAnswer) {
      alert('Dit veld is verplicht');
      return;
    }

    // Save current answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    // Check if there are more questions in current set
    if (currentQuestionIndex < currentQuestions.length - 1) {
      // Move to next question in the same set
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    // All questions in current set answered
    // For Step 1, check for follow-ups
    if (currentStep === 1) {
      const firstQuestion = currentQuestions[0];
      const firstAnswer = newAnswers[firstQuestion.id];
      const selectedOption = firstQuestion.options?.find(opt => opt.id === firstAnswer);

      if (selectedOption?.has_follow_up) {
        // Load follow-up questions
        await saveAllCurrentAnswers();
        setAllAnswers(prev => ({ ...prev, ...newAnswers }));
        setQuestionHistory(prev => [...prev, {
          step: currentStep,
          questions: currentQuestions,
          answers: newAnswers,
        }]);
        await loadFollowUpQuestions(firstQuestion.id, selectedOption.id);
      } else {
        // No follow-ups, move to next step
        await moveToNextStep();
      }
    } else if (currentStep === 4) {
      // Step 4: Check if user wants to upload photos
      const photosAnswer = newAnswers['q-general-photos'];
      const wantsPhotos = photosAnswer === 'opt-photos-yes';

      if (wantsPhotos) {
        // Show photo upload modal
        await saveAllCurrentAnswers();
        setAllAnswers(prev => ({ ...prev, ...newAnswers }));
        setShowPhotoModal(true);
      } else {
        // Skip photos, move to next step
        await moveToNextStep();
      }
    } else {
      // For other steps, just move to next step
      await moveToNextStep();
    }
  };

  const handlePhotoModalComplete = async (hasPhotos: boolean) => {
    setShowPhotoModal(false);
    await moveToNextStep();
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
      setCurrentStep(previous.step);
      setCurrentQuestions(previous.questions);
      setCurrentQuestionIndex(previous.questions.length - 1);
      setAnswers(previous.answers);
    } else {
      // No history, go back to homepage
      router.push('/');
    }
  };

  // Special rendering for Step 6 (all location fields together)
  const renderStep6LocationFields = () => {
    return (
      <div className="w-full max-w-[680px] mx-auto space-y-4">
        {currentQuestions.map((question) => (
          <Input
            key={question.id}
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            placeholder={question.placeholder_nl}
            className="w-full"
          />
        ))}
      </div>
    );
  };

  // Special rendering for Step 7 (all contact fields together)
  const renderStep7ContactFields = () => {
    return (
      <div className="w-full max-w-[680px] mx-auto space-y-4">
        {currentQuestions.map((question) => (
          <Input
            key={question.id}
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            placeholder={question.placeholder_nl}
            className="w-full"
          />
        ))}
      </div>
    );
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionType = currentQuestion.question_type;

    switch (questionType) {
      case 'radio':
        return (
          <RadioGroup
            value={selectedAnswer}
            onValueChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
            className="space-y-4"
          >
            {currentQuestion.options?.map((option) => (
              <QuestionnaireRadio
                key={option.id}
                id={option.id}
                name={currentQuestion.id}
                value={option.id}
                label={option.option_label_nl}
                checked={selectedAnswer === option.id}
              />
            ))}
          </RadioGroup>
        );

      case 'text':
        return (
          <Input
            type="text"
            value={selectedAnswer}
            onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
            placeholder={currentQuestion.placeholder_nl}
            className="w-full max-w-md"
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={selectedAnswer}
            onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
            placeholder={currentQuestion.placeholder_nl}
            className="w-full max-w-2xl min-h-[150px]"
          />
        );

      default:
        return <div>Question type {questionType} not yet implemented</div>;
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
          <p className="text-sm text-gray-500 mt-2 text-center">
            Stap {currentStep} van {totalSteps}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-7 py-12">
        <div className="w-full max-w-[680px]">
          {showOTPVerification ? (
            <OTPVerification
              phoneNumber={allAnswers['q-general-contact-phone'] || allAnswers['q-general-contact-phone-business'] || ''}
              onVerify={(otp) => {
                // TODO: Verify OTP and complete project submission
                console.log('OTP verified:', otp);
                alert('OTP geverifieerd! Project wordt ingediend...');
              }}
              onBack={() => setShowOTPVerification(false)}
            />
          ) : isLoading ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">Laden...</p>
            </div>
          ) : currentQuestion ? (
            <>
              {/* Step 6: Location fields (all together) */}
              {currentStep === 6 ? (
                <>
                  <h2 className="text-4xl font-normal leading-10 text-center text-foreground mb-8">
                    Wat is de projectlocatie?
                  </h2>

                  {/* All location fields */}
                  <div className="mb-12">
                    {renderStep6LocationFields()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={questionHistory.length === 0}
                      className="text-primary font-medium text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Vorige
                    </Button>

                    <Button
                      onClick={async () => {
                        // Validate all required fields
                        const allFilled = currentQuestions.every(q =>
                          q.is_required ? answers[q.id]?.trim() : true
                        );
                        if (!allFilled) {
                          alert('Vul alle velden in');
                          return;
                        }
                        await moveToNextStep();
                      }}
                      disabled={isSaving}
                      className="bg-primary hover:bg-primary/90 text-white font-medium text-base px-8 py-6 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Opslaan...' : 'Volgende'}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </>
              ) : currentStep === 7 ? (
                <>
                  <h2 className="text-4xl font-normal leading-10 text-center text-foreground mb-8">
                    Vul hier jouw gegevens in
                  </h2>

                  {/* All contact fields */}
                  <div className="mb-12">
                    {renderStep7ContactFields()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={questionHistory.length === 0}
                      className="text-primary font-medium text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Vorige
                    </Button>

                    <Button
                      onClick={async () => {
                        // Validate all required fields
                        const allFilled = currentQuestions.every(q =>
                          q.is_required ? answers[q.id]?.trim() : true
                        );
                        if (!allFilled) {
                          alert('Vul alle velden in');
                          return;
                        }

                        // Save Step 7 answers
                        await saveAllCurrentAnswers();
                        setAllAnswers(prev => ({ ...prev, ...answers }));

                        // Show OTP verification screen
                        setShowOTPVerification(true);
                      }}
                      disabled={isSaving}
                      className="bg-primary hover:bg-primary/90 text-white font-medium text-base px-8 py-6 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Opslaan...' : 'Ontvang offertes'}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Regular question rendering for other steps */}
                  {/* Question Counter (for multiple questions in same step) */}
                  {currentQuestions.length > 1 && (
                    <p className="text-center text-sm text-gray-500 mb-4">
                      Vraag {currentQuestionIndex + 1} van {currentQuestions.length}
                    </p>
                  )}

                  {/* Question */}
                  <h2 className="text-4xl font-normal leading-10 text-center text-foreground mb-4">
                    {currentQuestion.question_text_nl}
                  </h2>

                  {/* Help Text */}
                  {currentQuestion.help_text_nl && (
                    <p className="text-center text-sm text-gray-500 mb-8">
                      {currentQuestion.help_text_nl}
                    </p>
                  )}

                  {/* Answer Input */}
                  <div className="mb-12">
                    {renderQuestion()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={questionHistory.length === 0 && currentQuestionIndex === 0}
                      className="text-primary font-medium text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Vorige
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswer || isSaving}
                      className="bg-primary hover:bg-primary/90 text-white font-medium text-base px-8 py-6 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Opslaan...' : 'Volgende'}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-500">Geen vragen beschikbaar</p>
            </div>
          )}
        </div>
      </main>

      {/* Photo Upload Modal */}
      {showPhotoModal && draftId && (
        <PhotoUploadModal
          draftId={draftId}
          onClose={() => setShowPhotoModal(false)}
          onComplete={handlePhotoModalComplete}
        />
      )}
    </div>
  );
}
