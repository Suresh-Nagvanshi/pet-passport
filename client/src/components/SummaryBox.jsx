import { useState } from "react";

const SummaryBox = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  if (!summary)
    return (
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "12px",
          background: "#0f172a",
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        No summary generated yet.
      </div>
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "16px",
        background: "#1e293b",
        color: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0 }}>🧠 AI Health Summary</h3>

        <button
          onClick={handleCopy}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: copied ? "#22c55e" : "#334155",
            color: "white",
            fontSize: "12px",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Summary Content */}
      <div
        style={{
          lineHeight: "1.6",
          fontSize: "14px",
          color: "#e2e8f0",
          whiteSpace: "pre-line",
          overflowY: "auto",
          maxHeight: "300px", // 👈 scroll area
          paddingRight: "5px",
        }}
      >
        {summary}
      </div>
    </div>
  );
};

export default SummaryBox;
