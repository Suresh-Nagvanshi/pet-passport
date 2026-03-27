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
        width: "1000px",
        margin: "0 auto",
        padding: "20px 40px",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🐾 Your Pets</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4 per row
          gap: "20px",
        }}
      >
        {pets.map((pet) => (
          <div
            key={pet._id}
            onClick={() => navigate(`/passport/${pet._id}`)}
            style={{
              cursor: "pointer",
              background: "#1e293b",
              padding: "15px",
              borderRadius: "16px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
              transition: "0.3s",
            }}
          >
            <img
              src={pet.photo}
              alt={pet.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "10px",
              }}
            />

            <h3 style={{ margin: "5px 0" }}>{pet.name}</h3>
            <p style={{ opacity: 0.7 }}>
              {pet.breed} • {pet.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;