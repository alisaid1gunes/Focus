const redis = require('async-redis');



class RedisCache {
  constructor(keyFormat, expirationTime) {
    this.keyFormat = keyFormat;
    this.expirationTime = expirationTime;
    this.client = redis.createClient(
     process.env.REDIS_HOST || 'redis://localhost:6379',
    );
  }

  async set(key, data) {
    await this.client.setex(key, this.expirationTime, data);
  }

  async setCache(id, data) {
    const key = this.keyFormat + id;
    return await this.set(key, JSON.stringify(data));
  }

  async get(key) {
    // eslint-disable-next-line no-return-await
    return await this.client.get(key);
  }

  async getCache(id) {
    const key = this.keyFormat + id;
    const data = await this.get(key);
    return JSON.parse(data);
  }

  async clearCache(id) {
    const key = this.keyFormat + id;
    return await this.clear(key);
  }

  async clear(key) {
    return await this.client.del(key);
  }
}
module.exports = RedisCache;
