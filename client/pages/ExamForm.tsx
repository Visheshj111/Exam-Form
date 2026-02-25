import { useState } from "react";

export default function ExamForm() {
  const [view, setView] = useState<"home" | "exam">("home");
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const handleStartSection = (sectionId: number) => {
    setSelectedSection(sectionId);
    setView("exam");
  };

  const handleBackToHome = () => {
    setView("home");
    setSelectedSection(null);
  };

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

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
      <div style={{ maxWidth: "896px", margin: "0 auto" }}>
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
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>Question 1 of 60</h2>
          <p style={{ color: "#374151", marginBottom: "24px" }}>This is the first question for Section {selectedSection}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {["Option A", "Option B", "Option C", "Option D"].map((option, idx) => (
              <button
                key={idx}
                style={{ padding: "16px", borderRadius: "12px", border: "2px solid #e5e7eb", textAlign: "left", fontWeight: "500", background: "white", cursor: "pointer", fontSize: "16px" }}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <button style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "2px solid #d1d5db", fontWeight: "600", background: "white", cursor: "pointer", fontSize: "16px" }}>
              Previous
            </button>
            <button style={{ flex: 1, padding: "12px", borderRadius: "8px", background: "linear-gradient(to right, #3b82f6, #14b8a6)", color: "white", fontWeight: "600", border: "none", cursor: "pointer", fontSize: "16px" }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
