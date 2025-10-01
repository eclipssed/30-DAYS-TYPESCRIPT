type F = (x: number) => number;

function compose(functions: F[]): F {
  return function (x) {
    let y: number = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      let f = functions[i]!;
      y = f(y);
    }
    return y;
  };
}

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

// function compose(functions: F[]): F {
//   return function (x) {
//     return functions.reduceRight((accu, fn) => {
//       return fn(accu);
//     }, x);
//   };
// }
