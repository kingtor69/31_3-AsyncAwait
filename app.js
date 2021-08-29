// part I numbers

const part1step1 = document.querySelector('#I-1');
const part1step2 = document.querySelector('#I-2');
const part1step3 = document.querySelector('#I-3');


// step1
let thePromise = axios
    .get(`http://numbersapi.com/42`)

thePromise
    .then(data=> {
        return displayResult([data.data], part1step1);
    });

// step2
const fourFacts = [];

thePromise
    .then(data=> {
        fourFacts.push(data.data);
        return axios.get('http://numbersapi.com/42');
    })
    .then(data=> {
        fourFacts.push(data.data);
        return axios.get('http://numbersapi.com/42');
    })
    .then(data=> {
        fourFacts.push(data.data);
        return axios.get('http://numbersapi.com/42');
    })
    .then(data=> {
        fourFacts.push(data.data);
        return displayResult(fourFacts, part1step2);
    });

// step3
let fourMoreFacts = [];
for (let i = 0; i < 4; i++) {
    fourMoreFacts.push(
        axios.get(`http://numbersapi.com/42`)
    );
}

Promise.all(fourMoreFacts)
    .then(facts => {
        const datum = [];
        facts.forEach(data => datum.push(data.data))
        displayResult(datum, part1step3);
    });

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

// step1
let cardPromise = axios
    .get('http://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => {
        return axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        return parseCards(res.data.cards, part2step1)
    })
    .catch(err => {
        return displayResult([err], part2step1)
    });

function parseCards(cards, element) {
    const cardsParsed = [];
    for (let card of cards) {
        let value = card.value;
        let suit = card.suit;
        cardsParsed.push(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
    displayResult(cardsParsed, element);
}

// step 2
const twoCards = [];
let deck;
let twoCardPromise = axios
    .get('http://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(deal => {
        deck = deal.data.deck_id;
        return axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    })
    .then(one => {
        twoCards.push(one.data.cards[0])
        return axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    })
    .then(two => {
        twoCards.push(two.data.cards[0])
        return parseCards(twoCards, part2step2)
    })
    .catch(err => {
        return displayResult([err], part2step2)
    });

