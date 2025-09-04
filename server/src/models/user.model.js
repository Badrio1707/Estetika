import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: { value: 6, message: "Password must be at least 6 characters long" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
