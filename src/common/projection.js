import { isValidArray } from "./common";

const types = ["number", "string", "bigint", "boolean"];

export const projection = meta => data => meta.reduce((acc, key) => {
  if (isValidArray(key)) {
    const [field, name] = key;
    acc[name] = data[field];
  } else {
    if (types.includes(typeof data[key])) acc[key] = data[key]
  }
  return acc;
}, {});