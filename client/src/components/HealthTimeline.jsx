import { useState } from "react";

const HealthTimeline = ({ events = [], onUpdate }) => {
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

    onUpdate({
      healthEvents: [...events, form],
    });

    setForm({
      type: "checkup",
      date: "",
      description: "",
    });
  };

  return (
    <div style={card}>
      <h3 style={{ marginBottom: "20px" }}>Health Timeline</h3>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical Line */}
        <div style={line} />

        {events.map((e, i) => (
          <div key={i} style={row}>
            {/* DOT */}
            <div style={dotWrapper}>
              <div style={dot} />
            </div>

            {/* CONTENT */}
            <div style={content}>
              <div style={date}>{new Date(e.date).toDateString()}</div>

              <div style={type}>{e.type.toUpperCase()}</div>

              <div style={desc}>{e.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div style={formContainer}>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={input}
        >
          <option value="checkup">Checkup</option>
          <option value="surgery">Surgery</option>
          <option value="medication">Medication</option>
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={input}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={input}
        />

        <button onClick={handleAdd} style={button}>
          Add
        </button>
      </div>
    </div>
  );
};

/*  STYLES */

const card = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "20px",
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  color: "#1e293b",
};

const line = {
  position: "absolute",
  left: "20px",
  top: 0,
  bottom: 0,
  width: "2px",
  background: "#e2e8f0",
};

const row = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "20px",
};

const dotWrapper = {
  width: "40px",
  display: "flex",
  justifyContent: "center",
};

const dot = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: "#facc15",
  marginTop: "6px",
  boxShadow: "0 0 0 8px rgba(250,204,21,0.2)",
  position: "relative",
  zIndex: 2,
};

const content = {
  flex: 1,
  background: "#f8fafc",
  padding: "12px",
  borderRadius: "12px",
};

const date = {
  fontSize: "12px",
  color: "#64748b",
};

const type = {
  fontWeight: "600",
  margin: "5px 0",
};

const desc = {
  fontSize: "14px",
  color: "#475569",
};

const formContainer = {
  marginTop: "20px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const input = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#1e293b",
  outline: "none",
};

const button = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  background: "#facc15",
  color: "#1e293b",
  fontWeight: "600",
  cursor: "pointer",
};

export default HealthTimeline;
