import mongoose from "mongoose";

const housingApplicationSchema = new mongoose.Schema({
 
 
   studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student ID is required"],
    unique: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  documents: {
    nationalIdUrl: {
      type: String,
      required: [true, "National ID URL is required"]
    },

    passportUrl: {
      type: String,
      required: [true, "Passport URL is required"]
    },

    enrollmentProofUrl: {
      type: String,
      required: [true, "Enrollment Proof URL is required"]
    },

    photoUrl: {
      type: String,
      required: [true, "Photo URL is required"]
    }
  },

  rejectionReason: {
    type: String,
    default: "" //The official will write the reason.
  }

}, {
  timestamps: true
});

const HousingApplication = mongoose.model('HousingApplication', housingApplicationSchema);
export default HousingApplication;