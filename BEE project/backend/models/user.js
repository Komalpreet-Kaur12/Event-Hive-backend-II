const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: { type: Number, required: true },

    address: { type: String },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);