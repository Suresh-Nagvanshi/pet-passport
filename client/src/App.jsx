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

  const BASE_URL = window.location.origin.replace("5173", "5000");

  const handleGenerateSummary = async () => {
    setLoading(true);

    const res = await fetch(`${BASE_URL}/api/pets/${petId}/passport/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tone }),
    });

    const data = await res.json();
    setSummary(data.summary || "Failed");
    setLoading(false);
  };

  const handleUpdatePet = async (updatedPet) => {
    await fetch(`${BASE_URL}/api/pets/${petId}/passport`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPet),
    });

    const data = await getPetPassport(petId);
    setPet(data);
  };

  if (!pet) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "30px",
        background: "linear-gradient(to bottom, #fff7ed, #fefce8)",
        minHeight: "100vh",
      }}
    >
      {/* LEFT */}
      <div style={{ flex: 7 }}>
        <PetHeader pet={pet} />
        <TravelStatusBadge travelReadiness={pet.travelReadiness} />

        <VaccinationTable
          vaccinations={pet.vaccinations || []}
          onUpdate={handleUpdatePet}
        />

        <HealthTimeline
          events={pet.healthEvents || []}
          onUpdate={handleUpdatePet}
        />
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 3, position: "sticky", top: "20px" }}>
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>AI Summary</h3>

          {/* Tone Toggle */}
          <div style={{ marginBottom: "15px" }}>
            <span>Formal</span>

            <label style={{ margin: "0 10px", position: "relative" }}>
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
                  display: "inline-block",
                  width: "50px",
                  height: "25px",
                  background: tone === "friendly" ? "#22c55e" : "#ccc",
                  borderRadius: "25px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    background: "#fff",
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

          {/* Button */}
          <button
            onClick={handleGenerateSummary}
            style={{
              width: "100%",
              padding: "10px",
              background: "#facc15",
              border: "none",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

          <SummaryBox summary={summary} />

          {/* QR */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <QRCodeCanvas
              value={`${window.location.origin}/passport/${petId}`}
              size={120}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PetList />} />
      <Route path="/passport/:petId" element={<PassportPage />} />
    </Routes>
  );
}

export default App;