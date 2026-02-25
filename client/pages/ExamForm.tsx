import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string | number;
}

const SECTIONS = [
  {
    id: 1,
    name: "Section 1",
    description: "Core Concepts",
  },
  {
    id: 2,
    name: "Section 2",
    description: "Intermediate Topics",
  },
  {
    id: 3,
    name: "Section 3",
    description: "Advanced Concepts",
  },
  {
    id: 4,
    name: "Section 4",
    description: "Practical Applications",
  },
  {
    id: 5,
    name: "Section 5",
    description: "Specialized Topics",
  },
];

const generateQuestions = (sectionId: number): Question[] => {
  return Array.from({ length: 60 }, (_, i) => {
    const types: ("multiple-choice" | "true-false" | "short-answer")[] = [
      "multiple-choice",
      "true-false",
      "multiple-choice",
    ];

    const questionNum = i + 1;
    const type = types[i % 3];

    if (type === "true-false") {
      return {
        id: questionNum,
        question: `[Section ${sectionId}] Question ${questionNum}: Is the following statement correct? "Modern development requires understanding of core principles."`,
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
      };
    } else if (type === "multiple-choice") {
      return {
        id: questionNum,
        question: `[Section ${sectionId}] Question ${questionNum}: Which of the following best describes the primary concept?`,
        type: "multiple-choice",
        options: [
          "Option A - Most relevant",
          "Option B - Less relevant",
          "Option C - Incorrect",
          "Option D - Incorrect",
        ],
        correctAnswer: 0,
      };
    } else {
      return {
        id: questionNum,
        question: `[Section ${sectionId}] Question ${questionNum}: Explain the key difference between the two approaches.`,
        type: "short-answer",
      };
    }
  });
};

type ViewType = "home" | "exam" | "results";

export default function ExamForm() {
  const [view, setView] = useState<ViewType>("home");
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number | null>>(
    {}
  );
  const [showResults, setShowResults] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const currentSection = selectedSection ? SECTIONS.find(s => s.id === selectedSection) : null;
  const questions = selectedSection ? generateQuestions(selectedSection) : [];
  
  const filteredQuestions = useMemo(() => {
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter, questions]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const handleAnswer = (value: string | number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (
        answers[q.id] !== null &&
        answers[q.id] !== undefined &&
        answers[q.id] === q.correctAnswer
      ) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleStartSection = (sectionId: number) => {
    setSelectedSection(sectionId);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setView("exam");
  };

  const handleBackToHome = () => {
    setView("home");
    setSelectedSection(null);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  // HOME VIEW - Section Selection
  if (view === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              Exam Assessment
            </h1>
            <p className="text-gray-600 text-lg">
              Select a section to begin. Each section contains 60 questions.
            </p>
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">
                      {section.id}
                    </span>
                  </div>
                  <div className="text-sm px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-medium">
                    60 Q's
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {section.name}
                </h2>
                <p className="text-gray-600 mb-6">{section.description}</p>

                <Button
                  onClick={() => handleStartSection(section.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 text-lg font-semibold rounded-lg transition-all group-hover:shadow-lg"
                >
                  Start Section
                </Button>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              About This Exam
            </h3>
            <p className="text-gray-600 mb-2">
              • Total: 5 sections with 60 questions each (300 questions total)
            </p>
            <p className="text-gray-600 mb-2">
              • Question Types: Multiple choice, True/False, and Short answer
            </p>
            <p className="text-gray-600">
              • Results: Detailed feedback and performance analysis after each section
            </p>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS VIEW - Section Results
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              Section {selectedSection} Complete
            </h1>
            <p className="text-gray-600">{currentSection?.description}</p>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 ${
                  passed
                    ? "bg-green-100"
                    : "bg-orange-100"
                }`}
              >
                <span
                  className={`text-5xl font-bold ${
                    passed ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {percentage}%
                </span>
              </div>

              <h2
                className={`text-3xl font-bold mb-2 ${
                  passed ? "text-green-600" : "text-orange-600"
                }`}
              >
                {passed ? "Congratulations!" : "Keep Learning"}
              </h2>
              <p className="text-gray-600 text-lg">
                You answered {score} out of {questions.length} questions
                correctly
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
                <p className="text-2xl font-bold text-blue-600">{score}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Incorrect Answers</p>
                <p className="text-2xl font-bold text-red-600">
                  {questions.length - score}
                </p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Unanswered</p>
                <p className="text-2xl font-bold text-teal-600">
                  {questions.length - answeredCount}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleBackToHome}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-all"
              >
                <Home size={20} />
                Back to Sections
              </Button>
              <Button
                onClick={() => {
                  setCurrentIndex(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold hover:from-blue-600 hover:to-teal-600 transition-all"
              >
                Retake Section
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXAM VIEW - Question and Answer
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                {currentSection?.name}
              </h1>
              <p className="text-gray-600">{currentSection?.description}</p>
            </div>
            <button
              onClick={handleBackToHome}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
            >
              <Home size={18} />
              Exit
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Progress
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {answeredCount}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* Question Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="mb-8">
                {currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium ${
                          answers[currentQuestion.id] === idx
                            ? "border-blue-500 bg-blue-50 text-blue-900"
                            : "border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              answers[currentQuestion.id] === idx
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {answers[currentQuestion.id] === idx && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "short-answer" && (
                  <textarea
                    value={(answers[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition-all resize-none h-32 text-gray-900"
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                  Previous
                </Button>
                {currentIndex === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold hover:from-blue-600 hover:to-teal-600 transition-all"
                  >
                    Submit Section
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold hover:from-blue-600 hover:to-teal-600 transition-all"
                  >
                    Next
                    <ChevronRight size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Questions</h3>

              {/* Search/Filter */}
              <input
                type="text"
                placeholder="Filter..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none mb-4 text-sm"
              />

              {/* Question List */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all text-sm ${
                      currentIndex === idx
                        ? "bg-gradient-to-r from-blue-100 to-teal-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {answers[q.id] !== null && answers[q.id] !== undefined ? (
                      <CheckCircle2
                        size={18}
                        className="flex-shrink-0 text-green-500"
                      />
                    ) : (
                      <Circle
                        size={18}
                        className={`flex-shrink-0 ${
                          currentIndex === idx
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                    <span
                      className={`text-xs font-medium truncate ${
                        currentIndex === idx ? "text-blue-900" : "text-gray-700"
                      }`}
                    >
                      Q{q.id}
                    </span>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Answered</span>
                  <span className="font-bold text-gray-900">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Unanswered</span>
                  <span className="font-bold text-gray-900">
                    {questions.length - answeredCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
