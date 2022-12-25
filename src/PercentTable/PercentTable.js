import * as React from "react";
import { styles } from "../PercentTable/PercentTable.scss"

export function PercentTable(props)
{
    const { pairPercent, twoPairPercent, threeKindPercent, straightPercent, 
    flushPercent, fullHousePercent, fourKindPercent, straightFlushPercent } = props;
    return (
        <table id="percentTable">
            <tbody>
                <tr>
                    <th>Hand</th>
                    <th>Your %</th>
                    <th>Opponent %</th>
                </tr>
                <tr>
                    <td>Pair</td>
                    <td>{pairPercent.player}%</td>
                    <td>{pairPercent.opponent}%</td>
                </tr>
                <tr>
                    <td>Straight</td>
                    <td>{straightPercent.player}%</td>
                    <td>{straightPercent.opponent}%</td>
                </tr>
            </tbody>
        </table>
    )
}