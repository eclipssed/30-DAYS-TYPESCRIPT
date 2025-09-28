type P = Promise<number>;

async function addTowPromises(promise1: P, promise2: P): P {
  const res1 = await promise1;
  const res2 = await promise2;

  return await new Promise((resolve, reject) => {
    resolve(res1 + res2);
  });
}

// -----------------------------------------------

// SHORTCUT METHOD

// async function addTwoPromises2(...promises: P[]): Promise<number> {
//   const data = await Promise.all(promises);
//   return data.reduce((accum, val) => (accum += val), 0);
// }
