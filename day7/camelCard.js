const fs = require('fs');

function getHandRank(hand) {
    const cardCounts = {};
    hand.split('').forEach(card => cardCounts[card] = (cardCounts[card] || 0) + 1);
    
    const counts = Object.values(cardCounts).sort((a, b) => b - a);
    const uniqueCards = Object.keys(cardCounts).sort((a, b) => cardValue(b) - cardValue(a));

    if (counts[0] === 5) return { type: 7, cards: uniqueCards }; // Five of a kind
    if (counts[0] === 4) return { type: 6, cards: uniqueCards }; // Four of a kind
    if (counts[0] === 3 && counts[1] === 2) return { type: 5, cards: uniqueCards }; // Full house
    if (counts[0] === 3) return { type: 4, cards: uniqueCards }; // Three of a kind
    if (counts[0] === 2 && counts[1] === 2) return { type: 3, cards: uniqueCards }; // Two pair
    if (counts[0] === 2) return { type: 2, cards: uniqueCards }; // One pair
    return { type: 1, cards: uniqueCards }; // High card
}

function cardValue(card) {
    const order = 'A23456789TJQK';
    return order.indexOf(card);
}

function calculateWinnings(input) {
    const hands = input.split('\n').map(line => {
        const [hand, bid] = line.split(' ');
        return { hand, bid: parseInt(bid), rank: getHandRank(hand) };
    });

    hands.sort((a, b) => {
        if (a.rank.type !== b.rank.type) return a.rank.type - b.rank.type;
        for (let i = 0; i < a.rank.cards.length; i++) {
            if (a.rank.cards[i] !== b.rank.cards[i]) {
                return cardValue(b.rank.cards[i]) - cardValue(a.rank.cards[i]);
            }
        }
        return 0;
    });

    let totalWinnings = 0;
    hands.forEach((hand, index) => {
        totalWinnings += hand.bid * (index + 1);
    });

    return totalWinnings;
}

// Reading the input file and calculating the winnings
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    console.log(calculateWinnings(data));
});
