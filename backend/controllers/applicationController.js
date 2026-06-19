import HousingApplication from "../models/HousingApplication.js";
import Student from "../models/Student.js";

export const createApplication = async (req, res, next) => {
  try {
    const student = 
    await Student.findOne({ userId: req.user.id });

    if (!student) {
    return res.status(404).json({ success: false, msg: "Student profile not found" });
    }

    const existingApplication = 
    await HousingApplication.findOne({ studentId: student._id });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        msg: "You have already submitted a housing application.",
      });
    }

    const requiredFiles =
     ["nationalIdUrl", "passportUrl",
     "enrollmentProofUrl", "photoUrl"];
    const missingFiles =
    requiredFiles.filter((
    field) => !req.files?.[field]?.[0]?.path);

    if (missingFiles.length > 0) {
      return res.status(400).json({
        success: false,
        msg: "Please upload all required documents.",
        missingFiles,
      });
    }

    const application = 
    await HousingApplication.create({
    studentId: student._id,
    documents: {
        nationalIdUrl: req.files.nationalIdUrl[0].path,
        passportUrl: req.files.passportUrl[0].path,
        enrollmentProofUrl: req.files.enrollmentProofUrl[0].path,
        photoUrl: req.files.photoUrl[0].path,
      },
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};
