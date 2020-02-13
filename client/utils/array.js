import { isArray } from './check';

export const plainArray = arr => {
  if (!arr) return [];
  return arr.reduce((total, item) => {
    if (isArray(item)) {
      total.push(...plainArray(item));
    } else {
      total.push(item);
    }
    return total;
  }, []);
};

export const plainObjectArr = (arr, childKey) => {
  if (!arr) return [];
  return arr.reduce((total, item) => {
    total.push(item);
    if (isArray(item[childKey])) {
      total.push(...plainObjectArr(item[childKey], childKey));
    }
    return total;
  }, []);
};
