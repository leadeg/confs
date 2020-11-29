const DEFAULT_EXPIRE_TIME = 1000 * 60 * 5;

export default class CacheHelper {
  constructor() {
    this.store = new Map();
  }

  get(options) {
    const { cacheKey, expireTime } = options;
    const cache = this.store.get(cacheKey);
    if (!cache) {
      return null;
    }
    const { createdDate, cacheValue } = cache;
    const cacheCreatedDate = cache && new Date(createdDate);
    const cacheExpireDate = new Date(new Date() - (expireTime || DEFAULT_EXPIRE_TIME));
    return {
      createdDate,
      cacheValue,
      isExpired: cacheExpireDate > cacheCreatedDate,
    };
  }

  put(options, val) {
    const { cacheKey } = options;
    this.store.set(cacheKey, {
      createdDate: new Date(),
      cacheValue: val,
    });
  }

  remove(cacheKey) {
    this.store.delete(cacheKey);
  }
}
