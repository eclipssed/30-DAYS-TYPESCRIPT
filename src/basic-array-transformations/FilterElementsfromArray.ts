type Fn = (n: number, i: number) => any;

function filter(arr: number[], fn: Fn): number[] {
  const filteredArray: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]!;
    const res = fn(val, i);
    if (res) filteredArray.push(val);
  }
  return filteredArray;
}
