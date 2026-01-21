import redis from "../config/redis.js";

export const invalidateApiKeyCache = async (oldKey) => {
  if (!oldKey) return;

  const pattern = `cache:${oldKey}:*`;
  const keys = await redis.keys(pattern);

  if (keys.length > 0) {
    await redis.del(keys);
    console.log(`🧹 Cleared ${keys.length} cache entries`);
  }
};
