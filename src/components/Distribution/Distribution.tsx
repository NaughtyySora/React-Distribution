
import { projection } from "../../common/projection";
import { isArray, slice } from "../../common/common";
import { Table, tNumberColors } from "../Table/Table";
import { Bars } from "../Bars/Bars";
import "./Distribution.scss";

type tSortItem = number | string;
type tStringArray = Array<string>;

interface iDistribution<Item> {
  data: Item[];
  fields: Array<keyof Item | [keyof Item, string]>;
  sort?: { by: keyof Item, direction: "asc" | "desc" };
  colors?: string[];
  limit?: number;
  label?: boolean;
  className?: string;
  numbersColor?: tNumberColors;
  bars?: boolean;
};

const palette = [
  "#00A3FF",
  "#FE9D00",
  "#00BC72",
  "#61DAFB",
  "#E60091",
  "#FF6400",
  "#627EEA",
  "#FF3263",
  "#FE0",
  "#D922FE",
  "#0DCE90",
  "#00B600",
  "#FE2600",
  "#ECCEAB",
];

const sortStrategies = {
  number: (arg1: tSortItem, arg2: tSortItem) => (arg1 as number) - (arg2 as number),
  string: (arg1: tSortItem, arg2: tSortItem) => (arg1 as string).localeCompare(arg2 as string)
};

export const Distribution = <T extends object>({ data, fields, colors = palette,
  label = false, sort, numbersColor, limit = 0, bars = false, className = "" }: iDistribution<T>) => {

  const getFields = projection(fields);
  const parsed = data?.map(getFields);
  const sorted = slice(sort ? parsed.sort(listSort) : parsed, limit);
  const headList = fields.map(field => isArray(field) ? (field as tStringArray)[1] : field) as tStringArray;
  const colorsArray = new Array(Math.ceil(parsed.length / colors.length)).fill(colors).flat();
  const barsData = sorted.map((item, i) => ({ fill: colorsArray[i], value: item[sort?.by] }));

  function listSort(a: T, b: T) {
    if (!sort) return 0;
    const type = typeof a[sort.by];
    const type2 = typeof b[sort.by];
    if (type !== type2) return 0;
    const direction = sort?.direction === "asc";
    const arg1 = direction ? b : a;
    const arg2 = direction ? a : b;
    const sortFn = sortStrategies[type as keyof typeof sortStrategies];
    if (!sortFn) return 0;
    return sortFn(arg1[sort.by] as tSortItem, arg2[sort.by] as tSortItem);
  }

  return (
    <div className={`Distribution ${className}`}>
      {bars && <Bars data={barsData} other={{ from: 2 }} />}

      <Table
        colors={colorsArray}
        data={sorted}
        label={label}
        fields={headList}
        numbersColor={numbersColor}
      />
    </div>
  );
};