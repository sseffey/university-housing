import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema({
 
    
    studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student ID is required"]
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room ID is required"]
  },

  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },

    description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },

  category: {
    type: String,
    enum: ["plumbing", "electrical", "heating", "other"],
    required: [true, "Category is required"]
  },

  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending"
  }
}, {
  timestamps: true
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
export default MaintenanceRequest;
