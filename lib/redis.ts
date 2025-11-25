import { createClient, type RedisClientType } from "redis";

export class RedisSingleton {
  private static instance: RedisClientType<any> | null = null;

  private constructor() {}

  static async getInstance(): Promise<RedisClientType<any>> {
    if (!RedisSingleton.instance) {
      const client: RedisClientType<any> = createClient({
        url: process.env.Qwiz_app_REDIS_URL,
      });

      client.on("error", (err) => console.error("Redis Client Error:", err));

      await client.connect();

      RedisSingleton.instance = client;
    }

    return RedisSingleton.instance;
  }
}
