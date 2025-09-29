type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type ArrayType = { id: number } & Record<string, JSONValue>;

// function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
//   const map = new Map<number, ArrayType>();

//   arr1.forEach((item) => {
//     map.set(item.id, item);
//   });

//   arr2.forEach((item) => {
//     if (map.has(item.id)) {
//       map.set(item.id, { ...map.get(item.id)!, ...item });
//     } else {
//       map.set(item.id, item);
//     }
//   });
//   return Array.from(map.values()).sort((a, b) => a.id - b.id);
// }

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  const map = new Map<number, ArrayType>();

  arr1.concat(arr2).forEach((item) => {
    if (map.has(item.id)) {
      Object.assign(map.get(item.id)!, item);
    } else {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values());
}
