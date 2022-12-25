import * as React from "react";
import { faceDictR } from "../constants";
import { styles } from "../Card/Card.scss"

export function Card(props) {
    const { suit, rank, onClick, selected } = props;

    let imageSrc;
    switch (suit) {
        case 'spade':
            imageSrc = './images/spade.png';
            break;
        case 'heart':
            imageSrc = './images/heart.png';
            break;
        case 'club':
            imageSrc = './images/club.png';
            break;
        case 'diamond':
            imageSrc = './images/diamond.png';
            break;
    }

    let displayRank = rank in faceDictR ? faceDictR[rank] : rank

    const cardStyle = 
    {
        color: ((suit == "heart" || suit == "diamond") ? "red" : "black")
    }

    return (
        <div className="card" onClick={onClick} style={{boxShadow: selected ? "0 0 0 2px #FF0000" : ""}}>
            <img className="suit"src={imageSrc} />
            <div className="rank" style={{...cardStyle, ...{top: '0', left: '0'}}}>{displayRank}</div>
            <div className="rank" style={{...cardStyle, ...{top: '100%', left: '0', transform: 'translateY(-100%)'}}}>{displayRank}</div>
            <div className="rank" style={{...cardStyle, ...{top: '100%', left: '100%', transform: 'translate(-100%,-100%)'}}}>{displayRank}</div>
            <div className="rank" style={{...cardStyle, ...{top: '0', left: '100%', transform: 'translateX(-100%)'}}}>{displayRank}</div>

        </div>
    )
}