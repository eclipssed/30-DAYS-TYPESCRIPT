type Fn = (...params: number[]) => number;

function memoize(fn: Fn): Fn {
  let cacheMap = new Map<string, number>();
  return function (...args) {
    let key = JSON.stringify(args.sort((a, b) => a - b));
    if (cacheMap.has(key)) {
      return cacheMap.get(key)!;
    }
    const res = fn(...args);
    cacheMap.set(key, res);
    return res;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
