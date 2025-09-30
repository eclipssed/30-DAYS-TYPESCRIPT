type MultiDimensionalArray = (number | MultiDimensionalArray)[];

const flat = function (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray {
  const flattenedArr: MultiDimensionalArray = [];

  arr.forEach((item, index) => {
    if (Array.isArray(item) && n > 0) {
      flattenedArr.push(...flat(item, n - 1));
    } else {
      flattenedArr.push(item);
    }
  });
  return flattenedArr;
};
