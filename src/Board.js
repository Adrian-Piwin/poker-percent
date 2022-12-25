import * as React from "react";
import { Card } from "./Card";
import { useCallback } from 'react';
import { useState } from "react";



export function Board(props) {
    const {selectedCard, riverCards, holeCards} = props

    var holeElms = Array.from({length: holeCards.length}, (_, i) => {
        return <Card selected={selectedCard == i} suit={holeCards[i].suit} rank={holeCards[i].rank} key={i} />
    })

    var riverElms = Array.from({length: riverCards.length}, (_, i) => {
        return <Card selected={selectedCard == i+holeCards.length} suit={riverCards[i].suit} rank={riverCards[i].rank} key={i} />
    })

    return (
        <div id="board" >
            <div id="river">
                {riverElms}
            </div>
            <div id="hole">
                {holeElms}
            </div>
        </div>
    )
}