import { Distribution } from "./components/Distribution/Distribution";
import mocks from "./mocks/mocks.json";

export const App = () => {
  const data = Object.values(mocks);

  return (
    <div className="App" >
      <Distribution
        data={data}
        fields={["amount", ["id", "Custom Name"], "symbol", "average",]}
        sort={{ by: "average", direction: "asc" }}
        numbersColor="currentcolor"
        label
        bars
      />

      <Distribution
        data={data}
        fields={["symbol", "favorite", ["amount", "actually amount"]]}
        sort={{ by: "amount", direction: "asc" }}
        numbersColor="colorless"
        bars
        label
        limit={5}
        colors={["red", "blue", "orange", "white", "violet"]}
      />

      <Distribution
        data={data}
        fields={["name", ["amount", "Amount State"], "id", "average"]}
        sort={{ by: "name", direction: "asc" }}
        numbersColor="profit_loss"
        bars
        label
        limit={3}
      />
    </div>
  );
};