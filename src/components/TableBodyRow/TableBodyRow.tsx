import { iPrettyNumber } from "../PrettyNumber/PrettyNumber";
import { CSSProperties } from "react";
import { TableColumn } from "../TableColumn/TableColumn";
import { tNumberColors } from "../Table/Table";
import "./TableBodyRow.scss";

interface iTableBodyRow<Item> {
  item: Item;
  className?: string;
  label?: boolean;
  color?: string;
  numbersFormatter?: iPrettyNumber;
  numbersColor?: tNumberColors;
};

export const TableBodyRow = <T extends object>({ item, color, label, numbersColor = "colorless", className = "" }: iTableBodyRow<T>) => {
  const values = Object.values(item);

  return (
    <tr
      className={`TableBodyRow ${className} ${numbersColor}`}
      style={{ "--color": color } as CSSProperties}
    >
      {label && <th aria-label="label" className="TableBodyRow-label" />}
      {values.map((element, idx) => <TableColumn element={element} key={idx} />)}
    </tr>
  );
};