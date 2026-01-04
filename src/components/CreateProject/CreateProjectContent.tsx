'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import QuestionnaireNavbar from '@/components/Questionnaire/QuestionnaireNavbar';
import QuestionnaireRadio from '@/components/Questionnaire/QuestionnaireRadio';
import { getQuestionsForStep } from '@/data/generalQuestions';
import TopBar from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import type { QuestionWithOptions } from '@/types/questionnaire';
import { RadioGroup } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PhotoUploadModal from '@/components/Questionnaire/PhotoUploadModal';
import OTPVerification from '@/components/Questionnaire/OTPVerification';

export default function CreateProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draft');
  const locale = useLocale();
  const t = useTranslations('questionnaire');

  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState<
    QuestionWithOptions[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [allAnswers, setAllAnswers] = useState<Record<string, string>>({}); // Track all answers across steps
  const [questionHistory, setQuestionHistory] = useState<
    Array<{
      step: number;
      questions: QuestionWithOptions[];
      answers: Record<string, string>;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const totalSteps = 8;

  const currentQuestion = currentQuestions[currentQuestionIndex] || null;
  const selectedAnswer = answers[currentQuestion?.id || ''] || '';

  // Helper function to get localized text
  const getLocalizedText = (nlText?: string, enText?: string): string => {
    return locale === 'en' ? (enText || nlText || '') : (nlText || enText || '');
  };

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

  const loadQuestionsForStep = async (
    step: number,
    requestType?: 'private' | 'business'
  ) => {
    setIsLoading(true);
    try {
      if (step === 1) {
        // Step 1: Load category-specific questions from API
        const params = new URLSearchParams({ draftId: draftId! });
        const response = await fetch(`/api/project-draft/questions?${params}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load questions');
        }

        if (data.questions && data.questions.length > 0) {
          setCurrentQuestions(data.questions);
          setCurrentQuestionIndex(0);
          setAnswers({});
        }
      } else if (step >= 2 && step <= 7) {
        // Steps 2-7: Load from frontend (no API call!)
        const questions = getQuestionsForStep(step, requestType);

        if (questions && questions.length > 0) {
          // Convert Question[] to QuestionWithOptions[] format
          const convertedQuestions = questions.map((q) => ({
            id: q.id,
            question_text_nl: q.labelNl,
            question_text_en: q.labelEn,
            question_type: q.type,
            is_required: q.required,
            placeholder_nl: q.placeholderNl,
            placeholder_en: q.placeholderEn,
            help_text_nl: q.helpNl,
            help_text_en: q.helpEn,
            fieldName: q.fieldName, // Add fieldName for saving
            options:
              q.options?.map((opt) => ({
                id: opt.value, // Use value as ID
                option_value: opt.value,
                option_label_nl: opt.labelNl,
                option_label_en: opt.labelEn,
              })) || [],
          }));

          setCurrentQuestions(convertedQuestions);
          setCurrentQuestionIndex(0);
          setAnswers({});
        }
      } else if (step === 8) {
        // Step 8: Verification step
        setShowOTPVerification(true);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Er is een fout opgetreden bij het laden van de vragen.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFollowUpQuestions = async (
    parentQuestionId: string,
    parentOptionId: string
  ) => {
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

  const saveAnswer = async (
    questionId: string,
    selectedOptionId?: string,
    answerText?: string
  ) => {
    try {
      // Find the current question to get fieldName
      const question = currentQuestions.find((q) => q.id === questionId);

      await fetch('/api/project-draft/save-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftId,
          questionId,
          answerText,
          currentStep, // Add current step
          fieldName: question?.fieldName, // Add fieldName from question
        }),
      });
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const saveAllCurrentAnswers = async () => {
    setIsSaving(true);
    try {
      // For steps with multiple fields (Step 6, 7), use batch save
      if (currentStep === 6 || currentStep === 7) {
        // Build answers object with fieldName
        const answersWithFields: Record<
          string,
          { answerText: string; fieldName?: string }
        > = {};

        Object.entries(answers).forEach(([questionId, answer]) => {
          const question = currentQuestions.find((q) => q.id === questionId);
          if (question) {
            answersWithFields[questionId] = {
              answerText: answer,
              fieldName: question.fieldName,
            };
          }
        });

        // Single batch API call
        await fetch('/api/project-draft/save-answers-batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            draftId,
            answers: answersWithFields,
            currentStep,
          }),
        });
      } else {
        // For other steps, save individually
        await Promise.all(
          Object.entries(answers).map(([questionId, answer]) => {
            const question = currentQuestions.find((q) => q.id === questionId);
            if (!question) return Promise.resolve();

            return saveAnswer(questionId, undefined, answer);
          })
        );
      }
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
    setAllAnswers((prev) => ({ ...prev, ...answers }));

    // Save to history
    setQuestionHistory((prev) => [
      ...prev,
      {
        step: currentStep,
        questions: currentQuestions,
        answers,
      },
    ]);

    const nextStep = currentStep + 1;

    if (nextStep > totalSteps) {
      // All steps completed
      alert('Formulier voltooid!');
      return;
    }

    setCurrentStep(nextStep);

    // Special handling for Step 7 (conditional based on Step 2)
    if (nextStep === 7) {
      // Get request type from Step 2 answer (new ID: lead_request_type)
      const requestTypeAnswer = allAnswers['lead_request_type'];
      const requestType =
        requestTypeAnswer === 'business' ? 'business' : 'private';
      await loadQuestionsForStep(7, requestType);
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
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    // All questions in current set answered
    // For Step 1, check for follow-ups
    if (currentStep === 1) {
      const firstQuestion = currentQuestions[0];
      const firstAnswer = newAnswers[firstQuestion.id];
      const selectedOption = firstQuestion.options?.find(
        (opt) => opt.id === firstAnswer
      );

      if (selectedOption?.has_follow_up) {
        // Load follow-up questions
        await saveAllCurrentAnswers();
        setAllAnswers((prev) => ({ ...prev, ...newAnswers }));
        setQuestionHistory((prev) => [
          ...prev,
          {
            step: currentStep,
            questions: currentQuestions,
            answers: newAnswers,
          },
        ]);
        await loadFollowUpQuestions(firstQuestion.id, selectedOption.id);
      } else {
        // No follow-ups, move to next step
        await moveToNextStep();
      }
    } else if (currentStep === 4) {
      // Step 4: Check if user wants to upload photos
      const photosAnswer = newAnswers['project_photos'];
      const wantsPhotos = photosAnswer === 'yes';

      if (wantsPhotos) {
        // Show photo upload modal
        await saveAllCurrentAnswers();
        setAllAnswers((prev) => ({ ...prev, ...newAnswers }));
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePhotoModalComplete = async (hasPhotos: boolean) => {
    setShowPhotoModal(false);
    await moveToNextStep();
  };

  const handleBack = () => {
    // If we're not on the first question of the current set, go back within the set
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      return;
    }

    // If we have history, go back to previous set of questions
    if (questionHistory.length > 0) {
      const previous = questionHistory[questionHistory.length - 1];
      setQuestionHistory((prev) => prev.slice(0, -1));
      setCurrentStep(previous.step);
      setCurrentQuestions(previous.questions);
      setCurrentQuestionIndex(previous.questions.length - 1);
      setAnswers(previous.answers);
    } else {
      // No history, go back to homepage
      router.push('/');
    }
  };

  // Get user's current location and reverse geocode to address
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocatie wordt niet ondersteund door uw browser');
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Call our geocode API to get address from coordinates
          const response = await fetch(
            `/api/geocode?lat=${latitude}&lng=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Geocoding failed');
          }

          const data = await response.json();

          if (data.addressComponents) {
            // Parse address components
            const components = data.addressComponents;

            let postcode = '';
            let city = '';
            let streetName = '';
            let streetNumber = '';

            components.forEach(
              (component: {
                types: string[];
                long_name: string;
                short_name: string;
              }) => {
                if (component.types.includes('postal_code')) {
                  postcode = component.long_name;
                }
                if (component.types.includes('locality')) {
                  city = component.long_name;
                }
                if (component.types.includes('route')) {
                  streetName = component.long_name;
                }
                if (component.types.includes('street_number')) {
                  streetNumber = component.long_name;
                }
              }
            );

            // Auto-fill the location fields
            setAnswers({
              ...answers,
              project_postcode: postcode,
              project_city: city,
              project_street_name: streetName,
              project_street_number: streetNumber,
            });
          }
        } catch (error) {
          console.error('Error geocoding location:', error);
          alert('Kon adres niet ophalen van uw locatie');
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert(
          'Kon uw locatie niet ophalen. Controleer uw browser-instellingen.'
        );
        setIsLoadingLocation(false);
      }
    );
  };

  // Special rendering for Step 6 (all location fields together)
  const renderStep6LocationFields = () => {
    return (
      <div className='w-full max-w-[680px] mx-auto space-y-4'>
        {/* Use Current Location Button */}
        <Button
          type='button'
          variant='outline'
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          className='w-full flex items-center text-base md:text-lg justify-center gap-2 px-4 py-2 md:py-4 md:px-6 rounded-lg border-2 border-primary text-primary hover:bg-primary font-medium'
        >
          <MapPin className='w-4 h-4 md:w-5 md:h-5' />
          {isLoadingLocation
            ? 'Locatie ophalen...'
            : 'Gebruik mijn huidige locatie'}
        </Button>

        {/* Location input fields */}
        {currentQuestions.map((question) => (
          <Input
            key={question.id}
            type='text'
            value={answers[question.id] || ''}
            onChange={(e) =>
              setAnswers({ ...answers, [question.id]: e.target.value })
            }
            placeholder={getLocalizedText(question.placeholder_nl, question.placeholder_en)}
            className='w-full placeholder:text-neutral-400 text-secondary-foreground font-medium py-2 px-4 rounded-lg text-base md:py-4 md:px-6 md:rounded-xl h-auto md:text-lg'
          />
        ))}
      </div>
    );
  };

  // Special rendering for Step 7 (all contact fields together)
  const renderStep7ContactFields = () => {
    return (
      <div className='w-full max-w-[680px] mx-auto space-y-4'>
        {currentQuestions.map((question) => (
          <Input
            key={question.id}
            type='text'
            value={answers[question.id] || ''}
            onChange={(e) =>
              setAnswers({ ...answers, [question.id]: e.target.value })
            }
            placeholder={getLocalizedText(question.placeholder_nl, question.placeholder_en)}
            className='w-full placeholder:text-neutral-400 text-secondary-foreground font-medium py-2 px-4 rounded-lg md:py-4 md:px-6 md:rounded-xl h-auto md:text-lg'
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
            onValueChange={(value) =>
              setAnswers({ ...answers, [currentQuestion.id]: value })
            }
            className='space-y-1 md:space-y-4'
          >
            {currentQuestion.options?.map((option) => (
              <QuestionnaireRadio
                key={option.id}
                id={option.id}
                name={currentQuestion.id}
                value={option.id}
                label={getLocalizedText(option.option_label_nl, option.option_label_en)}
                checked={selectedAnswer === option.id}
              />
            ))}
          </RadioGroup>
        );

      case 'text':
        return (
          <Input
            type='text'
            value={selectedAnswer}
            onChange={(e) =>
              setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
            }
            placeholder={getLocalizedText(currentQuestion.placeholder_nl, currentQuestion.placeholder_en)}
            className='w-full max-w-md py-4 px-6 placeholder:text-neutral-400 text-secondary-foreground font-medium text-lg'
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={selectedAnswer}
            onChange={(e) =>
              setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
            }
            placeholder={getLocalizedText(currentQuestion.placeholder_nl, currentQuestion.placeholder_en)}
            className='w-full text-sm md:text-base max-w-2xl min-h-[150px]'
          />
        );

      default:
        return <div>Question type {questionType} not yet implemented</div>;
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {/* Top Bar */}
      <TopBar />

      {/* Questionnaire Navbar */}
      <QuestionnaireNavbar />

      {/* Progress Bar */}
      <div className='w-full px-7 pt-6'>
        <div className='max-w-[680px] mx-auto'>
          <Progress value={progressPercentage} className='h-2' />
        </div>
      </div>

      {/* Main Content */}
      <main className='flex-1 flex items-center justify-center px-4 py-6 md:px-7 md:py-12'>
        <div className='w-full max-w-[680px]'>
          {showOTPVerification ? (
            <OTPVerification
              phoneNumber={allAnswers['lead_phone'] || ''}
              draftId={draftId!}
              onVerify={(projectId) => {
                // Project created successfully!
                console.log('Project created:', projectId);
                alert(
                  'Project succesvol ingediend! U ontvangt binnenkort offertes.'
                );
                router.push('/dashboard');
              }}
              onBack={() => setShowOTPVerification(false)}
            />
          ) : isLoading ? (
            <div className='text-center'>
              <p className='text-lg text-gray-500'>Laden...</p>
            </div>
          ) : currentQuestion ? (
            <>
              {/* Step 6: Location fields (all together) */}
              {currentStep === 6 ? (
                <>
                  <h2 className='text-2xl md:text-4xl font-normal leading-10 text-center text-foreground  mb-4 md:mb-8'>
                    Wat is de projectlocatie?
                  </h2>

                  {/* All location fields */}
                  <div className='mb-6 md:mb-12'>
                    {renderStep6LocationFields()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className='flex items-center justify-between'>
                    <Button
                      variant='ghost'
                      onClick={handleBack}
                      disabled={questionHistory.length === 0}
                      className='text-primary font-medium text-sm md:text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <ArrowLeft className='w-4 h-4 md:w-5 md:h-5' />
                      Vorige
                    </Button>

                    <p className='text-xs md:text-sm text-gray-500 text-center'>
                      Stap {currentStep} van {totalSteps}
                    </p>

                    <Button
                      onClick={async () => {
                        // Validate all required fields
                        const allFilled = currentQuestions.every((q) =>
                          q.is_required ? answers[q.id]?.trim() : true
                        );
                        if (!allFilled) {
                          alert('Vul alle velden in');
                          return;
                        }
                        await moveToNextStep();
                      }}
                      disabled={isSaving}
                      className='bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 md:text-base md:px-8 md:py-4 rounded-lg md:rounded-xl w-auto flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      size={null}
                    >
                      {isSaving ? 'Opslaan...' : 'Volgende'}
                      <ArrowRight className='w-4 h-4 md:w-5 md:h-5' />
                    </Button>
                  </div>
                </>
              ) : currentStep === 7 ? (
                <>
                  <h2 className='text-2xl md:text-4xl font-normal leading-10 text-center text-foreground mb-8'>
                    Vul hier jouw gegevens in
                  </h2>

                  {/* All contact fields */}
                  <div className='mb-12'>{renderStep7ContactFields()}</div>

                  {/* Navigation Buttons */}
                  <div className='flex items-center justify-between'>
                    <Button
                      variant='ghost'
                      onClick={handleBack}
                      disabled={questionHistory.length === 0}
                      className='text-primary font-medium text-sm md:text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <ArrowLeft className='w-4 h-4 md:w-5 md:h-5' />
                      Vorige
                    </Button>

                    <p className='text-xs md:text-sm text-gray-500 text-center'>
                      Stap {currentStep} van {totalSteps}
                    </p>

                    <Button
                      onClick={async () => {
                        // Validate all required fields
                        const allFilled = currentQuestions.every((q) =>
                          q.is_required ? answers[q.id]?.trim() : true
                        );
                        if (!allFilled) {
                          alert('Vul alle velden in');
                          return;
                        }

                        // Save Step 7 answers
                        await saveAllCurrentAnswers();
                        setAllAnswers((prev) => ({ ...prev, ...answers }));

                        // Show OTP verification screen
                        setShowOTPVerification(true);
                      }}
                      disabled={isSaving}
                      className='bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 md:text-base md:px-8 md:py-4 rounded-lg md:rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSaving ? 'Opslaan...' : 'Ontvang offertes'}
                      <ArrowRight className='w-4 h-4 md:w-5 md:h-5' />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Regular question rendering for other steps */}
                  {/* Question Counter (for multiple questions in same step) */}
                  {currentQuestions.length > 1 && (
                    <p className='text-center text-xs md:text-sm text-gray-500 mb-4'>
                      {t('questionCounter', { current: currentQuestionIndex + 1, total: currentQuestions.length })}
                    </p>
                  )}

                  {/* Question */}
                  <h2 className='text-2xl md:text-4xl font-normal leading-10 text-center text-foreground mb-4'>
                    {getLocalizedText(currentQuestion.question_text_nl, currentQuestion.question_text_en)}
                  </h2>

                  {/* Help Text */}
                  {(currentQuestion.help_text_nl || currentQuestion.help_text_en) && (
                    <p className='text-center text-sm md:text-base text-slate-500 mb-11'>
                      {getLocalizedText(currentQuestion.help_text_nl, currentQuestion.help_text_en)}
                    </p>
                  )}

                  {/* Answer Input */}
                  <div className='mb-12'>{renderQuestion()}</div>

                  {/* Navigation Buttons */}
                  <div className='flex items-center justify-between'>
                    <Button
                      variant='ghost'
                      onClick={handleBack}
                      disabled={
                        questionHistory.length === 0 &&
                        currentQuestionIndex === 0
                      }
                      className='text-primary font-medium text-sm md:text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <ArrowLeft className='w-4 h-4 md:w-5 md:h-5' />
                      {t('previous')}
                    </Button>
                    <p className='text-xs md:text-sm text-gray-500 md:mt-2 text-center'>
                      {t('stepCounter', { current: currentStep, total: totalSteps })}
                    </p>
                    <Button
                      size={null}
                      onClick={handleNext}
                      disabled={!selectedAnswer || isSaving}
                      className='bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 md:text-base md:px-8 md:py-4 rounded-lg md:rounded-xl w-auto flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSaving ? t('saving') : t('next')}
                      <ArrowRight className='w-4 h-4 md:w-5 md:h-5' />
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className='text-center'>
              <p className='text-lg text-gray-500'>Geen vragen beschikbaar</p>
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
