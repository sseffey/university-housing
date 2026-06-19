import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },
    
  universityId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
    
  assignedRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
  },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
