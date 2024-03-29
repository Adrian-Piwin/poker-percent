import { faceDict, deckQty, masterHoleCards, masterRiverCards, straightQty, HandTypes } from "../constants";

export function getPercent(holeCards, riverCards, handType) {
  // Remove empty objects
  holeCards = holeCards.filter(obj => Object.keys(obj).length > 0);
  riverCards = riverCards.filter(obj => Object.keys(obj).length > 0);
  let chances = (masterRiverCards.length - riverCards.length) + (masterHoleCards.length - holeCards.length)

  // Get percent for selected type
  if (holeCards.length+riverCards.length > 0){
    switch (handType){
        case HandTypes.Pair:
          return pairPercent(holeCards.concat(riverCards), chances)
        case HandTypes.TwoPair:
          return twoPairPercent(holeCards.concat(riverCards), chances)
        case HandTypes.Straight:
          return straightPercent(holeCards.concat(riverCards), chances)
    }
  }

  return 0
}

// =============== Calculate Straight Percent ===============

function straightPercent(cards, chances) {
  // Get list of ranks
  let rankList = cards.map(card => card.rank);

  let potStraights = []
  // For every card, make a list of potential straights
  for (let i = 0; i < cards.length; i++) {
    let rank = cards[i].rank

    // rank = current rank
    // j = for each potential striaght for rank
    // k = for each straight
    for (let j = 0; j < straightQty; j++) {
      let straight = []
      for (let k = 0; k < straightQty; k++) {
        straight.push(k == j ? rank : rank + k - j)
      }
      if (!straight.some(v => v > 14 || v <= 1))
        potStraights.push(straight)
    }
  }

  // Put potential straights in objects with amt of cards needed for straight
  let straights = []
  for (let i = 0; i < potStraights.length; i++) {
    let obj = { cards: potStraights[i], cardsNeeded: straightQty - countMatchingValues(potStraights[i], rankList) }
    // If one of the straights dont require any cards return 100%
    if (obj.cardsNeeded == 0) return 100
    straights.push(obj)
  }

  // Filter duplicate straights and remove straights that require more cards than cards left
  straights = straights.filter(straight => straight.cardsNeeded <= chances);
  straights = removeDuplicateStraights(straights)

  // Calculate percent to get straight
  let totalPercent = 0
  straights.forEach(straight => {
    totalPercent += probabilityOfDrawingOuts(cards.length, straight.cardsNeeded, chances)
  });

  return (totalPercent * 100).toFixed(2);
}

// Removes duplicate straights
function removeDuplicateStraights(straights) {
  // Use the reduce method to create a new array with only unique objects
  const uniqueStraights = straights.reduce((acc, straight) => {
    // Check if there is another object with the same cards property in the accumulator
    const duplicate = acc.find(s => s.cards.join(',') === straight.cards.join(','));
    if (!duplicate) {
      // If there isn't, add the object to the accumulator
      acc.push(straight);
    }
    return acc;
  }, []);

  return uniqueStraights;
}

// =============== Calculate Fullhouse Percent ===============

function fullhousePercent(cards, chances) {

}

// =============== Calculate Pair Percent ===============

function pairPercent(cards, chances) {
  cards.sort((a, b) => a.rank - b.rank);

  // Check for pair
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].rank == cards[i + 1].rank) {
      return 100
    }
  }

  // Find odds of getting a pair
  return ((probabilityOfDrawingOuts(cards.length, cards.length*3, chances) * 100).toFixed(2));
}

// =============== Calculate Two Pair Percent ===============

function twoPairPercent(cards, chances) {
  cards.sort((a, b) => a.rank - b.rank);

  // Check for pair
  let firstPair = 0
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].rank == cards[i + 1].rank && cards[i].rank != firstPair) {
      if (firstPair == 0) firstPair = cards[i].rank
      else return 100
    }
  }

  // If there is only one pair, get probability of getting second pair
  if (firstPair == 1){
    return ((probabilityOfDrawingOuts(cards.length-2, (cards.length-2)*3, chances) * 100).toFixed(2));
  // Get probability of getting 2 pairs
  }else{

    // Find the probability of one card hitting a pair
    let firstPOdds = probabilityOfDrawingOuts(cards.length, cards.length*3, chances)

    // Now find the porbabilly of another card hitting a pair assuming the first one hits
    let secondPOdds = probabilityOfDrawingOuts(cards.length+1, (cards.length-1)*3, chances-1)

    return ((firstPOdds * secondPOdds)* 100).toFixed(2)
  }
}

// =============== Other Functions ===============

function probabilityOfDrawingOuts(cardsDrawn, outs, draws) {
  let cardsAvailable = 52 - cardsDrawn;
  let probability = 0;
  for (let i = 0; i < draws; i++) {
    probability += outs / cardsAvailable;
    cardsAvailable -= 1;
  }
  return probability;
}


// Returns number of matching values from 2 lists
function countMatchingValues(array1, array2) {
  // Create a counter variable to store the count of matching values
  let count = 0;

  // Iterate over the elements of the first array
  for (const value of array1) {
    // Check if the value is present in the second array
    if (array2.includes(value)) {
      // If it is, increment the counter
      count++;
    }
  }

  return count;
}

// Returns chance to get x unique cards with x chances
// deckSize: current amt of cards in deck
// uniqueNeeded: Amount of unique cards by value needed
// uniqueQty: Amount of unique cards in the current deck for each unique card
// chances: Amount of attempts to draw unique card
function chanceToGetUniqueCards(deckSize, uniqueNeeded, uniqueQty, chances) {
  let totalProbability = 1;

  for (let i = 0; i < uniqueNeeded; i++)
  {
    let probability = 0
    let temp = deckSize
    for (let j = 0; j < chances-i; j++) {
      probability += uniqueQty / temp;
      temp--;
    }

    totalProbability *= probability
  }

  return totalProbability;
}

// Returns chance to get at least 1 unique card with x chances
function chanceToGetUniqueCard(deckSize, uniqueNeeded, uniqueQty, chances) {
  let totalProbability = 0;

  for (let i = 0; i < chances; i++)
  {
    totalProbability += (uniqueNeeded * uniqueQty) / deckSize
    deckSize--
  }

  return totalProbability;
}