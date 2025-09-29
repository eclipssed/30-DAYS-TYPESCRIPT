type Fn<T> = () => Promise<T>;

async function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let completed: number = 0;

    if (functions.length === 0) resolve([]);

    functions.forEach((fn, i) => {
      fn()
        .then((val) => {
          results[i] = val;
          completed++;
          if (completed === functions.length) {
            return resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
