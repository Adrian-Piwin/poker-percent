export const faceDict = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11
}

export const faceDictR = {
    14: "A",
    13: "K",
    12: "Q",
    11: "J"
}

export const suitDict = {
    "C": "club",
    "S": "spade",
    "D": "diamond",
    "H": "heart",
}

export const HandTypes = {
    Pair: 'Pair',
    TwoPair: 'Two Pair',
    ThreeOfAKind: 'Three of a Kind',
    Straight: 'Straight',
    Flush: 'Flush',
    FullHouse: 'Full House',
    FourOfAKind: 'Four of a Kind',
    StraightFlush: 'Straight Flush',
    RoyalFlush: 'Royal Flush',
  };
  

export function hasLetter(string) {
    const letterRegex = /[a-z]/i;
    return letterRegex.test(string);
}

export const masterRiverCards = [{}, {}, {}, {}, {}]
export const masterHoleCards = [{}, {}]
export const deckQty = 52
export const straightQty = 5