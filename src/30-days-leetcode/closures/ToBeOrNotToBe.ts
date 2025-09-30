type ToBeOrNotToBe = {
  toBe: (val: any) => boolean | string;
  notToBe: (val: any) => boolean | string;
};

function expect(val: any): ToBeOrNotToBe {
  return {
    toBe(expectedVal) {
      if (expectedVal === val) {
        return true;
      } else {
        throw new Error("Not Equal");
      }
    },
    notToBe(expectedVal) {
      if (expectedVal !== val) {
        return true;
      } else {
        throw new Error("Equal");
      }
    },
  };
}

expect(5).toBe(5); // true
expect(5).notToBe(5); // throws "Equal"
