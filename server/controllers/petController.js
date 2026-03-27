import Pet from "../models/Pet.js";
import generateSummary from "../services/geminiService.js";

// ✅ GET Pet Passport
export const getPetPassport = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE Pet Passport (FIXED 🔥)
export const updatePetPassport = async (req, res) => {
  try {
    const {
      name,
      weight,
      photo,
      vaccinations,
      healthEvents,
      travelReadiness,
    } = req.body;

    const updateFields = {};

    // ✅ Only update provided fields
    if (name !== undefined) updateFields.name = name;
    if (weight !== undefined) updateFields.weight = weight;
    if (photo !== undefined) updateFields.photo = photo;
    if (vaccinations !== undefined) updateFields.vaccinations = vaccinations;
    if (healthEvents !== undefined) updateFields.healthEvents = healthEvents;
    if (travelReadiness !== undefined)
      updateFields.travelReadiness = travelReadiness;

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(updatedPet);
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GENERATE SUMMARY WITH TONE
export const generatePetSummary = async (req, res) => {
  try {
    const { tone } = req.body;

    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
                         
    const summary = await generateSummary(pet, tone);

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};