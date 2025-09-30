type Fn = (...args: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
  return async function (...args) {
    return await Promise.race([
      new Promise((resolve) => {
        const res = (fn(...args));
        resolve(res);
      }),

      new Promise((_, rej) => {
        setTimeout(() => {
          rej("Time Limit Exceeded");
        }, t);
      }),
    ]);
  };
}
