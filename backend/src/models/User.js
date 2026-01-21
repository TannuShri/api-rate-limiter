import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    apiKey: {
      type: String,
      unique: true
    },

    plan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
