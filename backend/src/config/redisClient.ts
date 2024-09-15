import { createClient } from "redis";


const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
})


redisClient.on('error', (error) => {
    console.error('Error in Redis client:', error);
}
);

redisClient.connect();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
}
);

export default redisClient;
