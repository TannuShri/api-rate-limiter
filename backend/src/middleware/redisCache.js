import redisClient from "../config/redis.js";

const redisCache = (ttlSeconds = 60) => {
  return async (req, res, next) => {
    if (req.method !== "GET") return next();

    if (!req.user?.apiKey) return next(); 

    const cacheKey = `cache:${req.originalUrl}:${req.user.apiKey}`;

    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("~~~Cache HIT");
        return res.json(JSON.parse(cachedData));
      }

      console.log("Cache MISS~~~");

      const originalJson = res.json.bind(res);
      res.json = (body) => {
        redisClient.setEx(
          cacheKey,
          ttlSeconds,
          JSON.stringify(body)
        );
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Redis cache error:", err);
      next();
    }
  };
};

export default redisCache;
