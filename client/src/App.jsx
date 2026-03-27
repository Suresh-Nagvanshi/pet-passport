import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { getPetPassport } from "./services/api";

import PetHeader from "./components/PetHeader";
import VaccinationTable from "./components/VaccinationTable";
import HealthTimeline from "./components/HealthTimeline";
import SummaryBox from "./components/SummaryBox";
import TravelStatusBadge from "./components/TravelStatusBadge";
import PetList from "./components/PetList";
import { QRCodeCanvas } from "qrcode.react";

// ✅ Passport Page
const PassportPage = () => {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("formal");

  useEffect(() => {
    const loadPet = async () => {
      const data = await getPetPassport(petId);
      setPet(data);
    };
    loadPet();
  }, [petId]);

  const handleGenerateSummary = async () => {
    setLoading(true);

    const BASE_URL = window.location.origin.replace("5173", "5000");

    const res = await fetch(`${BASE_URL}/api/pets/${petId}/passport/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tone }),
    });

    const data = await res.json();
    setSummary(data.summary || "Failed to generate summary");
    setLoading(false);
  };

  const handleUpdatePet = async (updatedPet) => {
    const BASE_URL = window.location.origin.replace("5173", "5000");

    await fetch(`${BASE_URL}/api/pets/${petId}/passport`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPet),
    });

    const data = await getPetPassport(petId);
    setPet(data);
  };

  if (!pet) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px 40px",
        alignItems: "flex-start",
      }}
    >
      {/* LEFT SIDE (70%) */}
      <div style={{ flex: 7 }}>
        <PetHeader pet={pet} />
        <TravelStatusBadge travelReadiness={pet.travelReadiness} />

        <VaccinationTable
          vaccinations={pet.vaccinations}
          onUpdate={handleUpdatePet}
        />

        <HealthTimeline events={pet.healthEvents} onUpdate={handleUpdatePet} />
      </div>

      {/* RIGHT SIDE (30%) */}
      <div
        style={{
          flex: 3,
          position: "sticky",
          top: "20px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>🧠 AI Summary</h3>

          {/* Tone Toggle */}
          <div style={{ marginBottom: "15px", color: "white" }}>
            <span>Formal</span>

            <label
              style={{
                display: "inline-block",
                margin: "0 10px",
                position: "relative",
                width: "50px",
                height: "25px",
              }}
            >
              <input
                type="checkbox"
                checked={tone === "friendly"}
                onChange={() =>
                  setTone(tone === "formal" ? "friendly" : "formal")
                }
                style={{ display: "none" }}
              />

              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  background: tone === "friendly" ? "#22c55e" : "#ccc",
                  borderRadius: "25px",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    height: "20px",
                    width: "20px",
                    background: "white",
                    borderRadius: "50%",
                    top: "2.5px",
                    left: tone === "friendly" ? "25px" : "3px",
                    transition: "0.3s",
                  }}
                />
              </span>
            </label>

            <span>Friendly</span>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateSummary}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              background: "#38bdf8",
              color: "#0f172a",
              border: "none",
              fontWeight: "600",
              marginBottom: "15px",
              cursor: "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

          {/* Summary */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <SummaryBox summary={summary} />
          </div>

          {/* 🔥 QR CODE SECTION */}
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                marginBottom: "10px",
                fontSize: "13px",
                opacity: 0.7,
              }}
            >
              Scan to open this passport
            </p>

            <QRCodeCanvas
              value={`${window.location.origin}/passport/${petId}`}
              size={120}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="H"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<PetList />} />
      <Route path="/passport/:petId" element={<PassportPage />} />
    </Routes>
  );
}

export default App;
