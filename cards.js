// part II
// step 3
// cards page

const newCardButt = document.querySelector('#new-card');
const cardTable = document.querySelector('#table');

let deckId;
let deckPromise = axios
    .get('http://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => {
        deckId = res.data.deck_id;
        return deck;
    })
    .catch(err => {
        return err;
    });

newCardButt.addEventListener('click', (e) => {
    let nextCard = axios
        .get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            return dealCard(res.data.cards[0].image, res.data.remaining)
        })
        .catch(err => {
            return err;
        });
});

function dealCard (url, cardsLeft) {
    card = document.createElement('img');
    card.src = url;
    card.classList.add('card');
    card.style.transform = `rotate(${(Math.random()*30)-15}deg)`
    cardTable.appendChild(card);
    if (cardsLeft === 0) {
        newCardButt.hidden = true;
    };
}