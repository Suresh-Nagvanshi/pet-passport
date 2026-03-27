import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPets } from "../services/api";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      const data = await getAllPets();
      setPets(data);
    };
    fetchPets();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        background: "linear-gradient(to bottom, #fff7ed, #fefce8)",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#1e293b",
          textAlign: "center",
          fontFamily: "cursive",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        Your Pets
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {pets.map((pet) => (
          <div
            key={pet._id}
            onClick={() => navigate(`/passport/${pet._id}`)}
            style={{
              cursor: "pointer",
              background: "#fff",
              padding: "15px",
              borderRadius: "16px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              transition: "transform 0.18s ease-out, box-shadow 0.18s ease-out",
              willChange: "transform",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.015)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={pet.photo}
              alt={pet.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "10px",
                transition: "transform 0.18s ease-out",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />

            <h3 style={{ margin: "5px 0", color: "#1e293b" }}>
              {pet.name}
            </h3>

            <p style={{ color: "#64748b" }}>
              {pet.breed} • {pet.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;