type Fn = (...args: number[]) => void;

const debounce = (fn: Fn, t: number): Fn => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return function (...args) {
    if (timerId !== null) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, t);
  };
};
