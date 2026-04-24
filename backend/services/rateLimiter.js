const Redis = require("ioredis");
const redis = new Redis();

const LIMIT = 5;
const WINDOW = 60; // seconds

async function checkRateLimit(userId) {
  const key = `rate:${userId}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW);
  }

  return count <= LIMIT;
}

module.exports = { checkRateLimit };