type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
  if (Array.isArray(obj)) {
    return obj.filter(Boolean).map((item) => {
      return typeof item === "object" ? compactObject(item as Obj) : item;
    });
  } else {
    const result: Record<string, JSONValue> = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (value) {
        result[key] =
          typeof value === "object" ? compactObject(value as Obj) : value;
      }
    });
    return result;
  }
}
