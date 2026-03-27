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
          background: "#ffffff",
          color: "#64748b",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
        background: "#ffffff",
        color: "#1e293b",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h3>AI Summary</h3>

        <button
          onClick={handleCopy}
          style={{
            background: "#facc15",
            border: "none",
            borderRadius: "8px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div style={{ whiteSpace: "pre-line", color: "#475569" }}>
        {summary}
      </div>
    </div>
  );
};

export default SummaryBox;