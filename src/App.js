import * as React from "react";
import { useState } from "react";
import { Board } from "./Board";
import { faceDict, suitDict, masterHoleCards, masterRiverCards, hasLetter } from "./constants";
import { evaluateHoleCards, test } from "./BusinessLogic";

export function App() {
  const [selectedCard, setSelectedCard] = useState(0)
  const [riverCards, setRiverCards] = useState(masterRiverCards)
  const [holeCards, setHoleCards] = useState(masterHoleCards)

  const onKeyUp = (e) => {
    // User cycles card
    if (e.key === "Tab" || e.key == "ArrowRight") {
      e.preventDefault();
      setSelectedCard(selectedCard + 1 >= riverCards.length + holeCards.length ? 0 : selectedCard + 1)
    }

    // User goes back
    if (e.key == "ArrowLeft") {
      e.preventDefault();
      setSelectedCard(selectedCard - 1 < 0 ? riverCards.length + holeCards.length - 1 : selectedCard - 1)
    }

    // User enters card
    if (hasLetter(e.key)) {
      // Get command from user
      var cmd = document.getElementById("cardInput").value

      // Attempt to run alt command
      // Exit if command was run
      if (altCommands(cmd)) return

      // Attempt to create card
      let card = createCard(cmd)
      if (card != undefined && card.suit != undefined) {
        // Attempt to update card
        updateCard(card, selectedCard)

        // Auto select next card
        setSelectedCard(selectedCard + 1 >= riverCards.length + holeCards.length ? 0 : selectedCard + 1)

        // Clear input
        document.getElementById("cardInput").value = ""
      }
    }

  };

  // Handle other commands
  // Returns whether a command was run or not
  const altCommands = (cmd) => {
    // Reset command
    if (cmd == "r") {
      setSelectedCard(0)
      resetCards()
      document.getElementById("cardInput").value = ""
      return true
    }

    return false
  }

  // Return a card created with a command
  const createCard = (cmd) => {
    // Get first 2 char and then 3rd char
    cmd = cmd.split("", cmd.length)

    if (cmd.length != 2 && cmd.length != 3) return

    if (cmd.length == 3) {
      cmd = [cmd[0] + cmd[1], cmd[2]]
    }

    // Create card if valid value/suit combo
    var card = {}
    if ((cmd[0] > 0 && cmd[0] <= 14) || cmd[0].toUpperCase() in faceDict) {
      if (cmd[1].toUpperCase() in suitDict) {
        card.rank = cmd[0].toUpperCase() in faceDict ? faceDict[cmd[0].toUpperCase()] : +cmd[0]
        card.suit = suitDict[cmd[1].toUpperCase()]
      }
    }

    return card
  }

  // Add a card with index
  const updateCard = (card, i) => {
    if (card == {}) return

    if (i + 1 > holeCards.length) {
      let copy = [...riverCards]
      copy[i - holeCards.length] = card
      setRiverCards(copy)
    } else {
      let copy = [...holeCards]
      copy[i] = card
      setHoleCards(copy)
    }
  }

  // Reset cards
  const resetCards = () => {
    setHoleCards(masterHoleCards)
    setRiverCards(masterRiverCards)
  }

  return (
    <div id="app">
      <Board selectedCard={selectedCard} riverCards={riverCards} holeCards={holeCards} />
      <div id="percent">{test(holeCards.concat(riverCards))}%</div>
      <input maxLength={3} onKeyUp={onKeyUp} id="cardInput" placeholder="Type"></input>
    </div>
  );
}
