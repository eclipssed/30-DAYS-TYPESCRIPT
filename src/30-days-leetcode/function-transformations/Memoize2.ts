type Fn = (...args: any[]) => any;

const memoize = (fn: Fn): Fn => {
  let cache = new Map();
  // let callCount = 0
  return function (...args) {
    let current = cache;
    for (let arg of args) {
      if (!current.has(arg)) {
        current.set(arg, new Map());
      }
      current = current.get(arg);
    }
    if (current.has("result")) {
      return current.get("result");
    }
    const result = fn(...args);
    current.set("result", result);
    return result;
  };
};

// ------------------------------------------------------------------------

// STRINGIFY APPROACH

// type Fn2 = (...args: any[]) => any;

// const memoize2 = (fn: Fn2): Fn2 => {
//   let cache = new Map<string, unknown>();
//   let objs = new Map<unknown, number>();
//   let objsIdx = 0;

//   const stringify = (inputs: any[]): string => {
//     return inputs.reduce((accu, elem) => {
//       if (typeof elem == null) {
//         return (accu += elem === null ? "n" : "u");
//       } else if (typeof elem === "object" || typeof elem === "symbol") {
//         if (objs.has(elem)) {
//           return (accu += `o${objs.get(elem)}`);
//         }
//         objs.set(elem, ++objsIdx);
//         return (accu += `o${objsIdx}`);
//       }
//       return (accu += `${typeof elem}${elem}`);
//     }, "");
//   };
//   return function (...args) {
//     const key = stringify(args);
//     if (cache.has(key)) {
//       return cache.get(key);
//     }
//     const res = fn(...args);
//     cache.set(key, res);
//     return cache.get(key);
//   };
// };
