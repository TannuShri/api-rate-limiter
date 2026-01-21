import redis from "../config/redis.js";

const cacheMiddleware = async (req, res, next) => {
  if (!req.user?.apiKey) return next();

  const key = `cache:${req.user.apiKey}:${req.method}:${req.originalUrl}`;

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log("~~~Cache HIT");
      return res.json(JSON.parse(cached));
    }

    console.log("Cache MISS~~~");

    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      if (res.statusCode === 200) {
        await redis.setEx(key, 60, JSON.stringify(data));
      }
      originalJson(data);
    };

    next();
  } catch (err) {
    console.error("Redis cache error", err.message);
    next();
  }
};

export default cacheMiddleware;
