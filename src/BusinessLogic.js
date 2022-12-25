import { faceDict, deckQty } from "./constants";

export function test(cards) {
  let activeCards = []
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].suit != undefined) {
      activeCards.push(cards[i])
    }
  }

  if (activeCards.length > 0)
    return pairPercent(activeCards, cards.length - activeCards.length)
}

// =============== Calculate Straight Percent ===============

function straightPercent(cards, cardsLeft) {

  // Get list of ranks
  let rankList = cards.map(card => card.rank);

  let potStraights = []
  // For every card, make a list of potential straights
  for (let i = 0; i < cards.length; i++) {
    let rank = cards[i].rank

    // rank = current rank
    // j = for each potential striaght for rank
    // k = for each straight
    for (let j = 0; j < 5; j++) {
      let straight = []
      for (let k = 0; k < 5; k++) {
        straight.push(k == j ? rank : rank + k - j)
      }
      if (!straight.some(v => v > 14 || v <= 0))
        potStraights.push(straight)
    }
  }

  // Put potential straights in objects with amt of cards needed for straight
  let straights = []
  for (let i = 0; i < potStraights.length; i++) {
    let obj = { cards: potStraights[i], cardsNeeded: 5 - countMatchingValues(potStraights[i], rankList) }
    straights.push(obj)
  }

  // Filter duplicate straights and remove straights that require more cards than cards left
  straights = straights.filter(straight => straight.cardsNeeded <= cardsLeft);
  straights = removeDuplicateStraights(straights)

  // Calculate percent to get straight
  let totalPercent = 0
  straights.forEach(straight => {
    totalPercent += chanceToGetUniqueCard(deckQty - cards.length, straight.cardsNeeded, cardsLeft)
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

function fullhousePercent(cards, cardsLeft) {

}

function pairPercent(cards, cardsLeft) {
  cards.sort((a, b) => a.rank - b.rank);

  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].rank == cards[i + 1].rank) {
      return 100
    }
  }

  let prob = 0
  for (let i = 0; i < cardsLeft; i++)
  {
    prob += ((cards.length*3) / (deckQty - cards.length - i))
  }

  return  (prob * 100).toFixed(2);;
}

// =============== Other Functions ===============

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

// Returns chance to get x unique cards (based on value) with x chances
function chanceToGetUniqueCard(deckSize, uniqueQty, chances) {
  let totalProbability = 1;

  for (let i = 0; i < uniqueQty; i++)
  {
    let probability = 0
    for (let j = 0; j < chances-i; j++) {
      probability += 4 / deckSize;
    }

    deckSize--;
    totalProbability *= probability
  }

  return totalProbability;
}

