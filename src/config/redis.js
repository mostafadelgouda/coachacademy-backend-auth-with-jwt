import { createClient } from "redis";
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

async function connectToRedis() {
  await redisClient.connect();
}

export { connectToRedis, redisClient };
