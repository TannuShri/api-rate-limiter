import redis from "../config/redis.js";
import RATE_LIMITS from "../config/rateLimits.js";


const rateLimiter = async (req, res, next) => {
  try {
    const user = req.user; // injected by API key middleware
    const apiKey = user.apiKey;
    const plan = user.plan || "FREE";
    const path = req.baseUrl; // "/api/test"

    const planLimits = RATE_LIMITS[plan];
    const rule = planLimits?.[path];

    if (!rule) return next(); // no limit for this route

    const key = `rate:${apiKey}:${path}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, rule.window);
    }

    if (count > rule.limit) {
      return res.status(429).json({
        message: "Rate limit exceeded",
        limit: `${rule.limit} requests per ${rule.window} seconds`,
        plan
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Rate limiter failed" });
  }
};

export default rateLimiter;
