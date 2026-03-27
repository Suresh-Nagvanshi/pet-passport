import mongoose from "mongoose";

const vaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateGiven: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  vetName: {
    type: String,
  },
  batchNumber: {
    type: String,
  },
});

const healthEventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["checkup", "surgery", "medication"],
    required: true,
  },
  description: {
    type: String,
  },
  vetName: {
    type: String,
  },
});

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
  type: String,
    },
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: Date,
    },
    weight: {
      type: Number,
    },
    microchipId: {
      type: String,
    },

    // ✅ Vaccinations
    vaccinations: [vaccinationSchema],

    // ✅ Health Events
    healthEvents: [healthEventSchema],

    // ✅ Travel Readiness
    travelReadiness: {
      microchipConfirmed: {
        type: Boolean,
        default: false,
      },
      rabiesValidUntil: {
        type: Date,
      },
      lastHealthCert: {
        type: Date,
      },
    },

    // ✅ Emergency Contacts
    emergencyContacts: {
      ownerPhone: String,
      emergencyVetName: String,
      emergencyVetPhone: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pet", petSchema);