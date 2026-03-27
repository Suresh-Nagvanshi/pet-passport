const PetHeader = ({ pet }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "25px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        color: "white",
      }}
    >
      {/* Pet Image */}
      <div
        style={{
          position: "relative",
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
            border: "4px solid #38bdf8",
          }}
        />
      </div>

      {/* Pet Info */}
      <div>
        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "600" }}>
          {pet.name}
        </h1>

        <p style={{ margin: "5px 0", opacity: 0.8 }}>
          {pet.breed} • {pet.type}
        </p>

        <p style={{ margin: 0, fontSize: "14px", opacity: 0.7 }}>
          Gender: {pet.gender}
        </p>
      </div>
    </div>
  );
};

export default PetHeader;