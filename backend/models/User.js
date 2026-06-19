import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8],
        select: false,
    },
    role: {
        type: String,
        enum: ["Super Admin", "Admin", "Student"],
        default: "Student"
    }
}, { timestamps: true });


// Create Pre Hook
userSchema.pre("save", async function () {
  // If Not Change Password Do not Run Bcrypt
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
// Create Method Compare Password
userSchema.methods.comparePassword = async function (matchedPassword) {
  return await bcrypt.compare(matchedPassword, this.password);
};
// Create Model
const User = mongoose.model("User", userSchema);
// Export Module
export default User;
