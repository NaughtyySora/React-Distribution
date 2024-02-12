import { FC } from "react";
import { PrettyNumber } from "../PrettyNumber/PrettyNumber";
import "./TableColumn.scss";

const renderStrategies = {
  number: (x: number | string) => <PrettyNumber value={x as number} />,
  string: (x: number | string) => <span>{x}</span>,
  boolean: (x: number | string) => <span>{x.toString()}</span>,
};

export interface iTableColumn {
  element: string | number;
};

export const TableColumn: FC<iTableColumn> = ({ element }) => {
  const type = typeof element;
  const Component = renderStrategies[type as keyof typeof renderStrategies];
  if (!Component) return null;

  return <td className="TableColumn">{Component(element)}</td>;
};