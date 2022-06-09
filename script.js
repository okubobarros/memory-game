const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;

   this.classList.add('flip');
   if(!hasFlippedCard) {
       hasFlippedCard = true;
       firstCard = this;
       return;
   } 

   secondCard = this;
   hasFlippedCard = false;
   checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListner('click', flipCard);
    secondCard.removeEventListner('click', flipCard); 

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

       resetBoard();
    }, 1500);
}

//IIFE Immediately Invoked Function Expression 
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

