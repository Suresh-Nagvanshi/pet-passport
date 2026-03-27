const TravelStatusBadge = ({ travelReadiness }) => {
  if (!travelReadiness) return null;

  const isReady = travelReadiness.microchipConfirmed;

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
    </div>
  );
};

export default TravelStatusBadge;