import * as React from "react";
import { styles } from "../PercentTable/PercentTable.scss";
import { getPercent } from "../BusinessLogic/BusinessLogic";
import { HandTypes } from "../constants";

export function PercentTable(props) {
  const { holeCards, riverCards } = props;

  // Generate a table row for each hand type
  const rows = Object.values(HandTypes).map((handType) => (
    <tr key={handType}>
      <td>{handType}</td>
      <td>{getPercent(holeCards, riverCards, handType)}%</td>
      <td>{getPercent([], riverCards, handType)}%</td>
    </tr>
  ));

  return (
    <table id="percentTable">
      <tbody>
        <tr>
          <th>Hand</th>
          <th>Your %</th>
          <th>Opponent %</th>
        </tr>
        {rows}
      </tbody>
    </table>
  );
}
