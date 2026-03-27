const PetHeader = ({ pet }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "25px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #fff7ed, #fef3c7)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={pet.photo}
        alt={pet.name}
        style={{
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #facc15",
        }}
      />

      <div>
        <h1 style={{ margin: 0, color: "#1e293b" }}>{pet.name}</h1>

        <p style={{ margin: "5px 0", color: "#475569", marginTop: "15px" }}>
          {pet.breed} • {pet.type}
        </p>

        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Gender: {pet.gender}
        </p>
      </div>
    </div>
  );
};

export default PetHeader;