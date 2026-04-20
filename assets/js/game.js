const myModule = (() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    const btnHit = document.querySelector('#btnHit'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew');

    const divPlayersCards = document.querySelectorAll('.divCartas'),
        smllPoints = document.querySelectorAll('small');

    let computerPlayerIndex = 0

    const initGame = (numPlayers = 2) => {
        deck = createDeck();

        playersPoints = [];
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0)
        }
        computerPlayerIndex = playersPoints.length - 1

        smllPoints.forEach( elem => elem.innerText = 0 );
        divPlayersCards.forEach( elem => elem.innerHTML = '' );

        btnHit.disabled = false;
        btnStop.disabled = false;
    }

    const createDeck = () => {
        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type);
            }
        }
        return _.shuffle(deck);
    }

    const hitCard = () => {
        if (!deck.length) throw 'Deck without cards'
        return deck.pop();
    }

    const cardValue = card => {
        const value = card.substring(0, card.length - 1)
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : Number(value)
    }

    const accumulatePoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        smllPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (turn, card) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/playing-cards/${card}.png`
        imgCard.classList.add('carta')
        divPlayersCards[turn].append(imgCard)
    }

    const determinateWinner = () => {

        const [ minPlayerPoints, computerPoints ] = playersPoints;

        setTimeout(() => {
            if (computerPoints === minPlayerPoints) {
                alert('Draw!')
            } else if (minPlayerPoints > 21) {
                alert('You lost!')
            } else if (computerPoints > 21) {
                alert('You win!')
            } else {
                alert('You lost')
            }
        }, 100)
    }

    const computerTurn = minPlayerPoints => {
        let computerPoints = 0;
        do {

            const card = hitCard();
            computerPoints = accumulatePoints(card, computerPlayerIndex)
            createCard(computerPlayerIndex, card)
        } while ((computerPoints < minPlayerPoints) && (minPlayerPoints <= 21))

        determinateWinner()
    }

    btnHit.addEventListener('click', () => {

        const card = hitCard();
        const playerPoints = accumulatePoints(card, 0)

        createCard(0, card)

        if (playerPoints > 21) {
            console.warn('You lost')
            btnHit.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints)
        } else if (playerPoints === 21) {
            console.warn('You have 21!')
            btnHit.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints)
        }
    });

    btnStop.addEventListener('click', () => {
        btnHit.disabled = true;
        btnStop.disabled = true;

        computerTurn(playersPoints[0])
    })

    return {
        newGame: initGame
    };
})();
