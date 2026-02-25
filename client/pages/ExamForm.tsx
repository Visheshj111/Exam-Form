import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string | number;
  category: string;
}

const QUESTIONS: Question[] = Array.from({ length: 60 }, (_, i) => {
  const types: ("multiple-choice" | "true-false" | "short-answer")[] = [
    "multiple-choice",
    "true-false",
    "multiple-choice",
  ];
  const categories = [
    "Fundamentals",
    "Advanced",
    "Practical",
    "Theory",
    "Best Practices",
  ];

  const questionNum = i + 1;
  const type = types[i % 3];
  const category = categories[i % 5];

  if (type === "true-false") {
    return {
      id: questionNum,
      question: `Question ${questionNum}: Is the following statement correct? "Modern web development requires understanding of asynchronous programming patterns."`,
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: 0,
      category,
    };
  } else if (type === "multiple-choice") {
    return {
      id: questionNum,
      question: `Question ${questionNum}: Which of the following best describes the primary benefit of using a component-based architecture?`,
      type: "multiple-choice",
      options: [
        "Reusability and maintainability",
        "Increased bundle size",
        "Slower initial load time",
        "Reduced development speed",
      ],
      correctAnswer: 0,
      category,
    };
  } else {
    return {
      id: questionNum,
      question: `Question ${questionNum}: Explain the key difference between synchronous and asynchronous programming.`,
      type: "short-answer",
      category,
    };
  }
});

export default function ExamForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number | null>>(
    {}
  );
  const [showResults, setShowResults] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(
      (q) =>
        q.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
        q.category.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter]);

  const currentQuestion = QUESTIONS[currentIndex];
  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const handleAnswer = (value: string | number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
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
    QUESTIONS.forEach((q) => {
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

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentIndex(0);
    setSearchFilter("");
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              Exam Complete
            </h1>
            <p className="text-gray-600">Review your results below</p>
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
                You answered {score} out of {QUESTIONS.length} questions
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
                  {QUESTIONS.length - score}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Unanswered</p>
                <p className="text-2xl font-bold text-purple-600">
                  {QUESTIONS.length - answeredCount}
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Performance by Category
              </h3>
              <div className="space-y-3">
                {Array.from(
                  new Set(QUESTIONS.map((q) => q.category))
                ).map((category) => {
                  const categoryQuestions = QUESTIONS.filter(
                    (q) => q.category === category
                  );
                  const categoryCorrect = categoryQuestions.filter(
                    (q) => answers[q.id] === q.correctAnswer
                  ).length;
                  const categoryPercentage = Math.round(
                    (categoryCorrect / categoryQuestions.length) * 100
                  );

                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {category}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {categoryCorrect}/{categoryQuestions.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${categoryPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6 text-lg font-semibold rounded-lg transition-all"
            >
              Retake Exam
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Exam Assessment
          </h1>
          <p className="text-gray-600">
            {QUESTIONS.length} questions • {currentQuestion.category}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Progress
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {answeredCount}/{QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
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
                  <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                    Question {currentIndex + 1} of {QUESTIONS.length}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {currentQuestion.category}
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
                {currentIndex === QUESTIONS.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Submit Exam
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
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
                {QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all text-sm ${
                      currentIndex === idx
                        ? "bg-gradient-to-r from-blue-100 to-purple-100"
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
                    {answeredCount}/{QUESTIONS.length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Unanswered</span>
                  <span className="font-bold text-gray-900">
                    {QUESTIONS.length - answeredCount}
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
