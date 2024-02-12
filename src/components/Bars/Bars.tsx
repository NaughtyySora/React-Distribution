import { FC } from "react";
import { getPercentage, getTotal } from "../../common/common";
import "./Bars.scss";

type tPrepareData = Required<Pick<iBars, "data" | "barsHeight" | "height">> & { other: iBars["other"] };

interface iBar {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

interface iBars {
  width?: number;
  height?: number;
  barsHeight?: number;
  data: {
    value: number;
    fill: string;
    [k: string]: any
  }[];
  other?: {
    from: number;
    color?: string;
  };
};

const mergeSmallAmounts = (fill: string, ...items: any[]) => items.reduce((acc, current, i) => {
  if (i === 0) acc = { ...current, width: 0, fill };
  acc.width += current.width;
  return acc;
}, undefined);

const prepareData = ({ data, barsHeight, height, other }: tPrepareData) => {
  const y = (height / 2) - (barsHeight / 2);
  const totalAmount = getTotal(data, "value");
  const equalParts = typeof totalAmount !== "number" || Object.is(totalAmount, NaN);

  let x = 0;

  const filtered: any = [];
  let rest = mergeSmallAmounts.bind(null, other?.color || "#909090");

  data.forEach(({ fill, value }, i) => {
    const width = equalParts ? (100 / data.length) : getPercentage(totalAmount, value);

    const result = {
      y,
      x: equalParts ? width * i : x,
      width,
      height,
      fill,
    };

    x += width;
    width < (other?.from || 0) ? rest = rest.bind(null, result) : filtered.push(result);
  });

  return { filtered, rest: rest() };
};

const BarItem = ({ width, x, ...props }: iBar, idx?: number) => (
  <rect
    {...props}
    x={x + PERCENT}
    width={width + PERCENT}
    key={idx}
    className="Bars-item"
    stroke={STROKE_COLOR}
    strokeWidth={STROKE_WIDTH}
    rx={BARS_RADIUS}
  />
);

const STROKE_COLOR = "#000";
const BARS_RADIUS = 4;
const STROKE_WIDTH = 2;
const PERCENT = "%";

export const Bars: FC<iBars> = ({ data, width, height = 50, barsHeight = 50, other }) => {
  const { filtered, rest } = prepareData({ data, barsHeight, height, other });

  return (
    <svg
      xmlns="http://www.w3.org/1999/xhtml"
      width={width || "100%"}
      height={height}
      className="Bars"
    >
      {filtered.map(BarItem)}

      {rest && BarItem(rest)}
    </svg>
  );
};