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
      <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>
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
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <img
              src={pet.photo}
              alt={pet.name}
              style={{
                width: "100%",
                height: "250px", // 🔥 increase height,
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "10px",
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