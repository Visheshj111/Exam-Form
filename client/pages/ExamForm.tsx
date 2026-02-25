import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const generateQuestions = (sectionId: number): Question[] => {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    question: `[Section ${sectionId}] Question ${i + 1}: What is the correct answer to this question?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
  }));
};

export default function ExamForm() {
  const [view, setView] = useState<"home" | "exam" | "results">("home");
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleStartSection = (sectionId: number) => {
    setSelectedSection(sectionId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setView("exam");
  };

  const handleBackToHome = () => {
    setView("home");
    setSelectedSection(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const questions = selectedSection ? generateQuestions(selectedSection) : [];
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleNext = () => {
    const questions = selectedSection ? generateQuestions(selectedSection) : [];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setView("results");
  };

  const questions = selectedSection ? generateQuestions(selectedSection) : [];
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : null;
  const answeredCount = Object.keys(selectedAnswers).length;

  if (view === "home") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>Exam Assessment</h1>
          <p style={{ color: "#4b5563", marginBottom: "48px", fontSize: "18px" }}>Select a section to begin. Each section contains 60 questions.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[1, 2, 3, 4, 5].map((section) => (
              <div key={section} style={{ background: "white", borderRadius: "16px", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb" }}>{section}</span>
                  </div>
                  <span style={{ fontSize: "14px", padding: "4px 12px", borderRadius: "9999px", background: "#f0fdfa", color: "#0d9488", fontWeight: "500" }}>60 Q's</span>
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>Section {section}</h2>
                <p style={{ color: "#4b5563", marginBottom: "24px" }}>Description for section {section}</p>
                <button
                  onClick={() => handleStartSection(section)}
                  style={{ width: "100%", background: "linear-gradient(to right, #3b82f6, #14b8a6)", color: "white", padding: "12px 16px", fontWeight: "600", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "16px" }}
                >
                  Start Section
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "exam" && currentQuestion) {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto" }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563" }}>Progress</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563" }}>{answeredCount}/{questions.length}</span>
            </div>
            <div style={{ width: "100%", height: "12px", background: "#e5e7eb", borderRadius: "9999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(to right, #3b82f6, #14b8a6)",
                  width: `${progressPercent}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827" }}>Section {selectedSection}</h1>
            <button
              onClick={handleBackToHome}
              style={{ color: "#2563eb", fontWeight: "600", padding: "8px 16px", borderRadius: "8px", background: "transparent", border: "none", cursor: "pointer" }}
            >
              Exit
            </button>
          </div>

          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "32px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p style={{ color: "#374151", marginBottom: "32px", fontSize: "18px" }}>{currentQuestion.question}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: currentAnswer === idx ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                    textAlign: "left",
                    fontWeight: "500",
                    background: currentAnswer === idx ? "#dbeafe" : "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#111827",
                    transition: "all 0.2s",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #d1d5db",
                  fontWeight: "600",
                  background: "white",
                  cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  opacity: currentQuestionIndex === 0 ? 0.5 : 1,
                  color: "#111827",
                }}
              >
                Previous
              </button>
              <button
                onClick={isLastQuestion ? handleSubmit : handleNext}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  background: "linear-gradient(to right, #3b82f6, #14b8a6)",
                  color: "white",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {isLastQuestion ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "results") {
    const correctAnswers = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "16px", textAlign: "center" }}>
            Section Complete!
          </h1>

          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "48px 32px", textAlign: "center" }}>
            <div
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                background: percentage >= 70 ? "#dcfce7" : "#fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <span style={{ fontSize: "48px", fontWeight: "bold", color: percentage >= 70 ? "#22c55e" : "#f59e0b" }}>
                {percentage}%
              </span>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: "bold", color: percentage >= 70 ? "#22c55e" : "#f59e0b", marginBottom: "16px" }}>
              {percentage >= 70 ? "Great Job!" : "Keep Learning"}
            </h2>

            <p style={{ color: "#4b5563", marginBottom: "32px", fontSize: "18px" }}>
              You answered {correctAnswers} out of {questions.length} questions correctly
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
              <div style={{ background: "#dbeafe", padding: "16px", borderRadius: "12px" }}>
                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>Correct</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>{correctAnswers}</p>
              </div>
              <div style={{ background: "#fee2e2", padding: "16px", borderRadius: "12px" }}>
                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>Incorrect</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>{questions.length - correctAnswers}</p>
              </div>
              <div style={{ background: "#ccfbf1", padding: "16px", borderRadius: "12px" }}>
                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>Unanswered</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#14b8a6" }}>{questions.length - answeredCount}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={handleBackToHome}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #d1d5db",
                  fontWeight: "600",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                Back to Sections
              </button>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setView("exam");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  background: "linear-gradient(to right, #3b82f6, #14b8a6)",
                  color: "white",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Retake Section
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
