import { TableBodyRow } from "../TableBodyRow/TableBodyRow";
import "./Table.scss";

export type tNumberColors = "colorless" | "currentcolor" | "profit_loss";

interface iTable<Item> {
  colors: string[];
  data: Item[];
  fields: Array<keyof Item>;
  label: boolean;
  numbersColor?: tNumberColors;
};

export const Table = <T extends object>({ colors, data, fields, label, numbersColor }: iTable<T>) => {

  return (
    <div className="Table-wrapper">
      <table className="Table">
        <thead className="Table-head">
          <tr className="Table-row head">
            {label && <th aria-label="label" className="Table-head-label" />}
            {fields?.map(col => (
              <th className="Table-column" key={col.toString()} scope="col">
                {col as string}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="Table-body">
          {data.map((item, idx) => (
            <TableBodyRow
              key={idx}
              item={item}
              data-id={idx}
              color={colors[idx]}
              label={label}
              numbersColor={numbersColor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};