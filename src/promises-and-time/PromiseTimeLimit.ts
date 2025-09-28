type Fn = (...args: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
  return async function (...args) {
    await Promise.race([
      new Promise((res) => {
        res(fn(...args));
      }),

      new Promise((_, rej) => {
        setTimeout(() => {
          rej("Time limit Exceeded.");
        }, t);
      }),
    ]);
  };
}
