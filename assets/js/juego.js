/**
 * 2C : Two of Clubs (Tréboles)
 * 2D : Two of Diamonds
 * 2H : Two of Hearts
 * 2S : Two of Spades
 */

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0, computerPoints = 0;

const btnHit = document.querySelector('#btnHit')
const btnStop = document.querySelector('#btnStop')
const btnNew = document.querySelector('#btnNew')

const smllPoints = document.querySelectorAll('small')
const divPlayerCards = document.querySelector('#jugador-cartas')
const divComputerCards = document.querySelector('#computadora-cartas')

const createDeck = () => {

    for ( let i = 2; i <= 10; i++ ) {
        for ( let type of types ) {
            deck.push( i + type );
        }
    }

    for ( let type of types ) {
        for ( let special of specials ) {
            deck.push( special + type );
        }
    }
    
    deck = _.shuffle( deck );
    console.log( deck );

    return deck;
}

createDeck();

const hitCard = () => {

    if ( deck.length === 0 ) {
        throw 'Deck without cards'
    }

    const card = deck.pop()

    return card;
}

const cardValue = card => {

    const value = card.substring(0, card.length-1)

    return ( isNaN( value ) ) ?
           ( value === 'A' )  ? 11 : 10 
           : Number(value)
}

const computerTurn = minPlayerPoints => {
    do {
        const card = hitCard();

        computerPoints = computerPoints + cardValue( card );
        smllPoints[1].innerText = computerPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/playing-cards/${card}.png`
        imgCard.classList.add('carta')
        divComputerCards.append( imgCard )

        if ( minPlayerPoints > 21 ) break;

    } while ( (computerPoints < minPlayerPoints) && (minPlayerPoints <= 21) )

    setTimeout(() => {
        if( computerPoints === minPlayerPoints ){
            alert('Draw!')
        } else if ( minPlayerPoints > 21 ) {
            alert('You lost!')
        } else if ( computerPoints > 21 ) {
            alert('You win!')
        } else {
            alert('You lost')
        }
    }, 100)
    
}

btnHit.addEventListener('click', () => {
    const card = hitCard();

    playerPoints = playerPoints + cardValue( card );
    smllPoints[0].innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/playing-cards/${card}.png`
    imgCard.classList.add('carta')
    divPlayerCards.append( imgCard )

    if ( playerPoints > 21 ) {
        console.warn('You lost')
        btnHit.disabled  = true;
        btnStop.disabled = true;
        computerTurn( playerPoints )
    } else if ( playerPoints === 21 ) {
        console.warn('You have 21!')
        btnHit.disabled  = true;
        btnStop.disabled = true;
        computerTurn( playerPoints )
    }
});

btnStop.addEventListener('click', () => {
    btnHit.disabled  = true;
    btnStop.disabled = true;

    computerTurn( playerPoints )
})

btnNew.addEventListener('click', () => {

    console.clear()
    deck = []
    deck = createDeck()

    playerPoints = 0;
    computerPoints = 0;

    smllPoints[0].innerText = 0
    smllPoints[1].innerText = 0

    
    divPlayerCards.innerHTML = ""
    divComputerCards.innerHTML = ""

    btnHit.disabled  = false;
    btnStop.disabled = false;

})
