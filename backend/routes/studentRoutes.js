import express from "express";
import { getStudentProfile } from "../controllers/studentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/profile", protect, authorize("Student", "Admin", "Super Admin"), getStudentProfile);
 router.get("/profile", protect, authorize("Student"), getStudentProfile);
export default router;
