class TimeLimitedCache {
  constructor(
    private cache = new Map<
      number,
      { value: number; timer: ReturnType<typeof setTimeout> }
    >()
  ) {}

  set(key: number, value: number, duration: number): boolean {
    const exists = this.cache.has(key);

    if (exists) {
      clearInterval(this.cache.get(key)!.timer);
    }
    const timer = setTimeout(() => {
      this.cache.delete(key);
    }, duration);
    this.cache.set(key, { value, timer });
    return exists;
  }

  get(key: number): number {
    return this.cache.has(key) ? this.cache.get(key)!.value : -1
  }

  count(): number {
    return this.cache.size;
  }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
