import { useState } from "react";

const HealthTimeline = ({ events, onUpdate }) => {
  const [form, setForm] = useState({
    type: "checkup",
    date: "",
    description: "",
  });

  const handleAdd = () => {
    if (!form.date || !form.description) {
      alert("Please fill all fields");
      return;
    }

    const updated = {
      healthEvents: [...events, form],
    };

    onUpdate(updated);

    setForm({
      type: "checkup",
      date: "",
      description: "",
    });
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
      <h3 style={{ marginBottom: "20px" }}>🩺 Health Timeline</h3>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "#334155",
            zIndex: 0, // 👈 important
          }}
        />

        {events.map((e, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            {/* LEFT COLUMN (DOT ON LINE) */}
            <div
              style={{
                width: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#38bdf8",
                  marginTop: "6px",
                  boxShadow: "0 0 0 4px rgba(56,189,248,0.2)",
                  position: "relative",
                  zIndex: 1, // 👈 brings dot above line
                }}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div
              style={{
                flex: 1,
                background: "#0f172a",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                {new Date(e.date).toDateString()}
              </div>

              <div style={{ fontWeight: "600", margin: "5px 0" }}>
                {e.type.toUpperCase()}
              </div>

              <div style={{ fontSize: "14px", color: "#e2e8f0" }}>
                {e.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={inputStyle}
        >
          <option value="checkup">Checkup</option>
          <option value="surgery">Surgery</option>
          <option value="medication">Medication</option>
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={inputStyle}
        />

        <button onClick={handleAdd} style={buttonStyle}>
          Add
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#38bdf8",
  color: "#0f172a",
  fontWeight: "600",
  cursor: "pointer",
};

export default HealthTimeline;
