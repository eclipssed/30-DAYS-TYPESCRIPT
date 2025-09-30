type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
  let result: Obj[][] = [];
  for (let i = 0; i < arr.length; i+=size) {
    result.push(arr.slice(i, size + i));
  }
  return result;
}


// function chunk<T>(arr: T[], size: number): T[][] {
//   return arr.reduce((accu, _, i) => {
//     if(i%size === 0) {
//         accu.push(arr.slice(i, size+i))
//     }
//     return accu
//   }, [] as T[][])
// }
