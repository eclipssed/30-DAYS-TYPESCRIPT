type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | JSONValue[];

function isEmpty(obj: Obj): boolean {
  if (obj.length) {
    return !obj.length ? true : false;
  }
  return !Object.keys(obj).length ? true : false;
}
