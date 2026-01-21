import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

await redisClient.connect();

const redisPatternDelete=async(pattern)=>{
  const keys=await redisClient.keys(pattern);
  if(keys.length>0){
    await redisClient.del(keys);
  }
}

export default redisClient;
