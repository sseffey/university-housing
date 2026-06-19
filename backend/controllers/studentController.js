import Student from "../models/Student.js";

// @desc    Get current student profile
// @route   GET /api/student/profile
// @access  Private
export const getStudentProfile = async (req, res) => {
  try {
    const student =
    await Student.findOne({ userId: req.user.id }).populate("userId", "email role");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Get student profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
