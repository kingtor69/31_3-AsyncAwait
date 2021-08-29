// part I numbers

const part1step1 = document.querySelector('#I-1');
const part1step2 = document.querySelector('#I-2');
const part1step3 = document.querySelector('#I-3');


async function getNumFacts(num, numOfFacts, element) {
    const facts = []
    const url = `http://numbersapi.com/${num}`
    for (let i = 0; i < numOfFacts; i++) {
        let resp = await axios.get(url);
        facts.push(resp.data)
    }
    displayResult(facts, element)
}

async function getFactForMultipleNums (arrOfNums, element) {
    const facts = [];
    let resp = await axios.get(`http://numbersapi.com/${arrOfNums}`);
    // factsObj = resp.data
    for (let i = 0; i < arrOfNums.length; i++) {
        facts.push(resp.data[arrOfNums[i]])
    }
    displayResult(facts, element)
}

// step1
getNumFacts(42, 1, part1step1);

// step2
getFactForMultipleNums([12, 13, 57], part1step2)

// step3
getNumFacts(42, 4, part1step3)

function displayResult(datum, element) {
    let newUl = document.createElement('ul');
    for (let i=0; i<datum.length; i++) {
        const newLi = document.createElement('li');
        newLi.innerText = datum[i];
        newUl.appendChild(newLi)
    }
    element.insertAdjacentElement('afterend', newUl)
};

// Part II cards
const part2step1 = document.querySelector('#II-1');
const part2step2 = document.querySelector('#II-2');
const part2step3 = document.querySelector('#II-3');

async function shuffleDeckAndDrawCards(numOfCards, element) {
    const baseUrl = 'http://deckofcardsapi.com/api/deck/';
    let deckResp = await axios.get(`${baseUrl}new/shuffle/`);
    let cardsResp = await axios.get(`${baseUrl}${deckResp.data.deck_id}/draw/?count=${numOfCards}`);
    console.log(cardsResp);
    parseCards(cardsResp.data.cards, element);
}

function parseCards(cards, element) {
    const cardsParsed = [];
    for (let card of cards) {
        let value = card.value;
        let suit = card.suit;
        cardsParsed.push(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
    displayResult(cardsParsed, element);
}

// step1
shuffleDeckAndDrawCards(1, part2step1);

// step 2
shuffleDeckAndDrawCards(2, part2step2);