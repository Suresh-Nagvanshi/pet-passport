const TravelStatusBadge = ({ travelReadiness, onUpdate }) => {
  if (!travelReadiness) return null;

  const isReady = travelReadiness.microchipConfirmed;

  const handleConfirm = () => {
    onUpdate({
      travelReadiness: {
        ...travelReadiness,
        microchipConfirmed: true,
      },
    });
  };

  return (
    <div style={{ marginTop: "15px", textAlign: "center" }}>
      <div
        style={{
          padding: "10px 20px",
          borderRadius: "999px",
          background: isReady ? "#dcfce7" : "#fee2e2",
          color: isReady ? "#166534" : "#991b1b",
          fontWeight: "600",
          display: "inline-block",
        }}
      >
        {isReady ? "Ready for Travel" : "Not Ready for Travel"}
      </div>

      {/* 🔥 Show button only if NOT ready */}
      {!isReady && (
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleConfirm}
            style={{
              padding: "6px 12px",
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Mark Microchip Installed
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelStatusBadge;