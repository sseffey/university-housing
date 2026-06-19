import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import User from "../models/User.js";
import loginSchema from "../validation/authLoginValidation.js";
import registerValidation from "../validation/authRegisterValidation.js";

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not configured");
  }

  return jwt.sign(
    {id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const loginController = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({ msg: error.details.map((err) => err.message) });
    }

    const { email, password } = value;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email Or Password" });
    }

    const matchedPassword = await user.comparePassword(password);

    if (!matchedPassword) {
      return res.status(400).json({ msg: "Invalid Email Or Password" });
    }

    const token = createToken(user);
    res.status(200).json({ msg: "Success Login", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const registerController = async (req, res) => {
  try {
    const { error, value } =
    registerValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({ msg: error.details.map((err) => err.message) });
    }

    const { email, password, fullName, universityId, gender, phoneNumber } = value;

    const existingUser =
    await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ msg: "Email already exists" });
    }

    const existingStudent = 
    await Student.findOne({ universityId });
    if (existingStudent) {
    return res.status(400).json({ msg: "University ID already exists" });
    }

    const newUser = 
    await User.create({ email, password });

    try {
      await Student.create({
        userId: newUser._id,
        fullName,
        universityId,
        gender,
        phoneNumber,
      });
    } catch (error) {
      await User.deleteOne({ _id: newUser._id });
      throw error;
    }

    const token = createToken(newUser);
    res.status(201).json({ msg: "Success Register", token });
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(400).json({ msg: `${field} already exists` });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: error.message });
    }

    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { loginController, registerController };
