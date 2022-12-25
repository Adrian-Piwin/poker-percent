export const faceDict = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11
}

export const suitDict = {
    "C": "club",
    "S": "spade",
    "D": "diamond",
    "H": "heart",
}

export function hasLetter(string) {
    const letterRegex = /[a-z]/i;
    return letterRegex.test(string);
}

export const masterRiverCards = [{}, {}, {}, {}, {}]
export const masterHoleCards = [{}, {}]
export const deckQty = 52