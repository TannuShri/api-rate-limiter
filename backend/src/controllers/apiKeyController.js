import crypto from "crypto";
import User from "../models/User.js";
import ApiKeyAudit from "../models/ApiKeyAudit.js";
import redisPatternDelete from "../config/redis.js";

export const rotateApiKey = async (req, res) => {
  try {
      const user = req.user;

    const oldKey = user.apiKey;
    const newKey = crypto.randomBytes(32).toString("hex");

    //  Prevent rapid rotation
    if (Date.now() - user.updatedAt < 5 * 60 * 1000) {
      return res.status(429).json({
        message: "API key can only be rotated every 5 minutes"
      });
    }

    user.apiKey = newKey;
    await req.user.save();

    //invalidate all redis data for old key
    await redisPatternDelete(`rate:${oldKey}*`);
    await redisPatternDelete(`apikey:${oldKey}`);


    await ApiKeyAudit.create({
      userId: user._id,
      oldKey,
      newKey
    });

    res.json({
      message: "API key rotated successfully",
      apiKey: newKey,
    });
  } catch (err) {
    console.error("API KEY ROTATION ERROR:", err);
    res.status(500).json({
      message: "API key rotation failed",
      error: err.message,
    });
  }
};
