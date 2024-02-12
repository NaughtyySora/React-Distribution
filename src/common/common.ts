export const getTotal = <T, F extends keyof T>(dataset: T[], field: F) =>
  dataset.reduce((acc, current) => (acc += current[field] as number), 0);

export const getPercentage = (base: number, part: number) => part === 0 ? 0 : 100 / (base / part);

export const id = (x: any) => x;

export const slice = <T extends object>(array: T[], range?: number) => range ? array.slice(0, range) : array;

export const isArray = (ds: any) => Array.isArray(ds) && !!ds.length;