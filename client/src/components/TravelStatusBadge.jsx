const TravelStatusBadge = ({ travelReadiness }) => {
  if (!travelReadiness) return null;

  const isReady = travelReadiness.microchipConfirmed;

  return (
    <div
      style={{
        marginTop: "15px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "10px 20px",
          borderRadius: "999px",
          background: isReady
            ? "rgba(34,197,94,0.15)"
            : "rgba(239,68,68,0.15)",
          color: isReady ? "#22c55e" : "#ef4444",
          fontWeight: "600",
          fontSize: "14px",
          border: `1px solid ${
            isReady ? "#22c55e" : "#ef4444"
          }`,
          backdropFilter: "blur(6px)",
        }}
      >
        {isReady ? "🟢 Ready for Travel" : "🔴 Not Ready for Travel"}
      </div>
    </div>
  );
};

export default TravelStatusBadge;