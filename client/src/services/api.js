const BASE_URL = `${window.location.origin.replace("5173", "5000")}/api/pets`;

export const getPetPassport = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/passport`);
  return res.json();
};

export const updatePetPassport = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}/passport`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const generateSummary = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/passport/summary`, {
    method: "POST",
  });
  return res.json();
};

export const getAllPets = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};