import express from "express";
import { createApplication } from "../controllers/applicationController.js";
import upload from "../config/cloudinaryConfig.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const documentUpload = upload.fields([
  { name: "nationalIdUrl", maxCount: 1 },
  { name: "passportUrl", maxCount: 1 },
  { name: "enrollmentProofUrl", maxCount: 1 },
  { name: "photoUrl", maxCount: 1 },
]);

router.post("/apply", protect, authorize("Student"), documentUpload, createApplication);

export default router;

