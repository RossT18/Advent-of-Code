import { readDataArray } from './DataReader.js';

const data = readDataArray(7);

const specialCardValueMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const handTypes = ['high', 'one', 'two', 'three', 'full', 'four', 'five'] as const;

type HandType = (typeof handTypes)[number];

function getUniqueLetterCounts(cards: string): { [letter: string]: number } {
  const counts = {};
  for (const card of cards) {
    if (counts[card] === undefined) {
      counts[card] = 1;
      continue;
    }
    counts[card] += 1;
  }
  return counts;
}

function classifyHand(hand: string): HandType {
  const counts = getUniqueLetterCounts(hand);

  const countValues = Object.values(counts);

  if (countValues.includes(5)) {
    return 'five';
  } else if (countValues.includes(4)) {
    return 'four';
  } else if (countValues.includes(3)) {
    if (countValues.includes(2)) {
      return 'full';
    } else {
      return 'three';
    }
  } else if (countValues.includes(2)) {
    // could be one or two pair
    const pairCount = countValues.reduce((acc, c) => {
      return acc + (c === 2 ? 1 : 0);
    }, 0);
    if (pairCount === 1) {
      return 'one';
    } else {
      return 'two';
    }
  }

  return 'high';
}

function classifyHandWithJokers(hand: string): HandType {
  const counts = getUniqueLetterCounts(hand);

  if (Object.values(counts).includes(5)) return 'five';

  const mostCommonNonJoker = Object.entries(counts).reduce(
    (prev, curr) => {
      const [currentLetter, currentCount] = curr;
      if (counts[prev] < currentCount && currentLetter !== 'J') return currentLetter;
      return prev;
    },
    Object.keys(counts).filter((k) => k !== 'J')[0],
  );

  const newHand = hand.replaceAll('J', mostCommonNonJoker);

  return classifyHand(newHand);
}

function getHandAndBid(dataLine: string) {
  const [hand, bidString] = dataLine.split(' ');
  return { hand, bid: parseInt(bidString) };
}

function rankSimilarHands(hand1: string, hand2: string): -1 | 1 {
  // -1 means hand1 is worse hand
  function findCardRank(cardIndex: number) {
    const [h1CardRank, h2CardRank] = [hand1[cardIndex], hand2[cardIndex]].map((card): number => {
      if (specialCardValueMap[card] !== undefined) {
        return specialCardValueMap[card];
      }
      return parseInt(card);
    });

    if (h1CardRank === h2CardRank) return findCardRank(cardIndex + 1);

    if (h1CardRank > h2CardRank) return 1;
    return -1;
  }

  return findCardRank(0);
}

function part1() {
  const part1Data: string[] = JSON.parse(JSON.stringify(data));

  part1Data.sort((h1, h2) => {
    // return zero for same
    // negative for h1 going before h2 (h1 is worse hand)
    // positive for h1 going after h2 (h1 is better hand)

    const { hand: h1Hand } = getHandAndBid(h1);
    const { hand: h2Hand } = getHandAndBid(h2);

    const h1Classification = classifyHand(h1Hand);
    const h2Classification = classifyHand(h2Hand);

    const h1Rank = handTypes.findIndex((t) => t === h1Classification);
    const h2Rank = handTypes.findIndex((t) => t === h2Classification);

    if (h1Rank > h2Rank) return 1;
    if (h1Rank < h2Rank) return -1;

    // they have the same rank so must check individual cards
    return rankSimilarHands(h1, h2);
  });

  return part1Data.reduce((acc, c, i) => {
    const { bid } = getHandAndBid(c);
    return acc + (i + 1) * bid;
  }, 0);
}

function part2() {
  specialCardValueMap['J'] = 1;
  const part2Data: string[] = JSON.parse(JSON.stringify(data));

  part2Data.sort((h1, h2) => {
    const { hand: h1Hand } = getHandAndBid(h1);
    const { hand: h2Hand } = getHandAndBid(h2);

    const h1Classification = h1Hand.includes('J')
      ? classifyHandWithJokers(h1Hand)
      : classifyHand(h1Hand);
    const h2Classification = h2Hand.includes('J')
      ? classifyHandWithJokers(h2Hand)
      : classifyHand(h2Hand);

    const h1Rank = handTypes.findIndex((t) => t === h1Classification);
    const h2Rank = handTypes.findIndex((t) => t === h2Classification);

    if (h1Rank > h2Rank) return 1;
    if (h1Rank < h2Rank) return -1;

    // they have the same rank so must check individual cards
    return rankSimilarHands(h1, h2);
  });

  return part2Data.reduce((acc, c, i) => {
    const { bid } = getHandAndBid(c);
    return acc + (i + 1) * bid;
  }, 0);
}

console.log({
  part1: part1(),
  part2: part2(),
});
