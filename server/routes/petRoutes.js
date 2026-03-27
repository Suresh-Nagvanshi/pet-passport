import express from "express";
import {
  getPetPassport,
  updatePetPassport,
  generatePetSummary,
} from "../controllers/petController.js";
import { getAllPets } from "../controllers/petController.js";


const router = express.Router();

// GET all pets (for PetList)
router.get("/", getAllPets);

// GET passport
router.get("/:id/passport", getPetPassport);

// UPDATE passport
router.put("/:id/passport", updatePetPassport);

// GENERATE summary
router.post("/:id/passport/summary", generatePetSummary);

export default router;