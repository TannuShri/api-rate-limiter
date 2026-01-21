import mongoose from "mongoose";

const apiKeyAuditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  oldKey: String,
  newKey: String,
  rotatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ApiKeyAudit", apiKeyAuditSchema);
