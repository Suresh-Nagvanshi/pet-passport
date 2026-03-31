import { useState } from "react";

const VaccinationTable = ({ vaccinations, onUpdate }) => {
  const [form, setForm] = useState({
    name: "",
    dateGiven: "",
    expiryDate: "",
  });

  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.name || !form.dateGiven || !form.expiryDate) {
      setError("Please fill all fields");
      return;
    }

    const given = new Date(form.dateGiven);
    const expiry = new Date(form.expiryDate);

    // 🔥 Validation
    if (expiry < given) {
      setError("Expiry date cannot be before date given");
      return;
    }

    setError("");

    onUpdate({
      vaccinations: [...vaccinations, form],
    });

    setForm({
      name: "",
      dateGiven: "",
      expiryDate: "",
    });
  };

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return { label: "Expired", color: "#ef4444" };
    if (diffDays < 30) return { label: "Expiring Soon", color: "#f59e0b" };
    return { label: "Valid", color: "#22c55e" };
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "20px",
        background: "#ffffff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        color: "#1e293b",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Vaccinations</h3>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ color: "#64748b" }}>
            <th style={{ padding: "10px", textAlign: "center" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Date Given</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Expiry</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {(vaccinations || []).map((v, i) => {
            const status = getStatus(v.expiryDate);

            return (
              <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px" }}>{v.name}</td>
                <td style={{ padding: "10px" }}>
                  {new Date(v.dateGiven).toDateString()}
                </td>
                <td style={{ padding: "10px" }}>
                  {new Date(v.expiryDate).toDateString()}
                </td>

                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: "999px",
                      background: `${status.color}15`,
                      color: status.color,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Form */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          placeholder="Vaccine Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        <input
          type="date"
          value={form.dateGiven}
          onChange={(e) => setForm({ ...form, dateGiven: e.target.value })}
          style={inputStyle}
        />

        <input
          type="date"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
          style={inputStyle}
        />

        <button onClick={handleAdd} style={buttonStyle}>
          Add
        </button>
      </div>

      {/* 🔥 Inline Error */}
      {error && (
        <p
          style={{
            color: "#ef4444",
            marginTop: "10px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: "#a3a2a2",
  color: "#1e293b",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  background: "#facc15",
  color: "#1e293b",
  fontWeight: "600",
  cursor: "pointer",
};

export default VaccinationTable;