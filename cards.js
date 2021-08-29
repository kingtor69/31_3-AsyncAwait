// part II
// step 3
// cards page

const newCardButt = document.querySelector('#new-card');
const cardTable = document.querySelector('#table');

let deckId;
async function shuffleDeck() {

    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/')
    try {
        deckId = res.data.deck_id;
        return deckId;
    }
    catch (err) {
        return err;
    }
}

deckId = shuffleDeck()


newCardButt.addEventListener('click', (e) => {
    nextCard(deckId)
    // let nextCard = axios
    //     .get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    //     .then(res => {
    //         return dealCard(res.data.cards[0].image, res.data.remaining)
    //     })
    //     .catch(err => {
    //         return err;
    //     });
});

async function nextCard(deckId) {
    let resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    dealCard(resp.data.cards[0].image, resp.data.remaining);
};

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