import { useState } from "react";

const VaccinationTable = ({ vaccinations, onUpdate }) => {
  const [form, setForm] = useState({
    name: "",
    dateGiven: "",
    expiryDate: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.dateGiven || !form.expiryDate) {
      alert("Please fill all fields");
      return;
    }

    const newVaccination = { ...form };

    onUpdate({
      vaccinations: [...vaccinations, newVaccination],
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
        borderRadius: "16px",
        background: "#1e293b",
        color: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>💉 Vaccinations</h3>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#94a3b8" }}>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Date Given</th>
            <th style={{ padding: "10px" }}>Expiry</th>
            <th style={{ padding: "10px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {vaccinations.map((v, i) => {
            const status = getStatus(v.expiryDate);

            return (
              <tr
                key={i}
                style={{
                  borderTop: "1px solid #334155",
                }}
              >
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
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: `${status.color}20`,
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
        }}
      >
        <input
          placeholder="Vaccine Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="date"
          value={form.dateGiven}
          onChange={(e) =>
            setForm({ ...form, dateGiven: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="date"
          value={form.expiryDate}
          onChange={(e) =>
            setForm({ ...form, expiryDate: e.target.value })
          }
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

export default VaccinationTable;