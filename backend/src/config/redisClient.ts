import { createClient } from "redis";
import 'dotenv/config';


const redisClient = createClient({
    password: process.env.REDIS_PASSWORD || '',
    socket: {
        host: process.env.REDIS_HOST || 'redis://localhost:6379',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    }
});


redisClient.connect()
  .then(() => console.log('Connected to Redis Cloud'))
  .catch((err) => console.error('Failed to connect to Redis Cloud:', err));

export default redisClient;
