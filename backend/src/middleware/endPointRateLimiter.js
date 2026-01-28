import redis from "../config/redis.js";
import RATE_LIMITS from "../config/rateLimits.js";

const rateLimiter = async (req, res, next) => {
  try {
    if (!req.user || !req.user.apiKey) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const plan = req.user.plan || "FREE";

    // Normalize endpoint
    const endpoint = req.baseUrl + req.route.path;
    const config = RATE_LIMITS[plan]?.[endpoint];

    if (!config) {
      // No rate limit defined → allow request
      return next();
    }

    const { limit, window } = config;

    if (!limit || !window) {
      console.error("Invalid rate limit config:", config);
      return next();
    }

    const key = `rate:${req.user.apiKey}:${endpoint}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, window); 
    }

    if (current > limit) {
      return res.status(429).json({
        message: "Rate limit exceeded",
        limit: `${limit} requests per ${window} seconds`
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Rate limiter failed" });
  }
};

export default rateLimiter;
