const deckCards = ["Agaility.png", "Agaility.png", "Boat.png","Boat.png", "citizenship.png", "citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", "Nuka-Cola.png", "Nuka-Cola.png", "Robotics.png", "Robotics.png", "shock.png", "shock.png"];

const deck = document.querySelector(".deck");
let opened = [];
let matched = [];

const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");

let moves = 0;

const star = document.getElementById("star-rating").querySelector(".star");

let starCount = 3;

const timerCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function startGame(){
    const shuffleDeck = shuffle(deckCards);

    for(let i = 0; i < shuffleDeck.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement('IMG');
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "images/" + shuffleDeck[i]);
        addImage.setAttribute("alt", "images of vault boy");
        deck.appendChild(liTag);
    }
}

startGame();
function removeCard(); {
    while(deck.hasChildNodes()){
        deck.removeChild(deck.firstChild);
    }

}

function timer() {
    time = setInterval(function() {
        seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }

            timerCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + "Timer: " + minutes + "Mins" + seconds + "Secs" ;

    }, 1000);

}

function stopTime(){
    clearInterval(time);
}

function resetEverything(){
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timerCounter.innerHTML = "<i class='fa fa-hourglass-start'></li>" + "Timer: 00:00";

    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");

    starCount = 3;

    moves = 0;

    movesCount.innerHTML = 0;

    matched = [];

    opened = [];

    removeCard();

    startGame();
}

function movesCount(){
    movesCount.innerHTML ++;
    moves ++;
}

function starRating(){
    if(moves === 14){
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }

    if (moves === 18) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

function compareTwo(){
    if (opened.length === 2){
        document.body.style.pointerEvents = "none";
    }
    
    if(opened.length === 2 && opened[0].src === opened[1].src){
        noMatch();
    }
}

function mathc(){
    setTimeout(function(){
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        matched.push(...opened);
        document.body.style.pointerEvents = "auto";

        winGame();
        opened = [];
    }, 600);

    movesCount();
    starRating();

}

function noMatch(){
    setTimeout(function(){
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];
    }, 700);

    movesCount();
    starRating();
}

function AddStats(){
    const stats = document.querySelector(".modal-content");
    for (let i = 1; i <= 3; i++){
        const statElement = document.createElement("p");
        statsElement.classList.add("stats");
        stats.appendChild(statsElement);
    }

    let p = stats.querySelector("p.stats");
    p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds ";
    p[1].innerHTML = "Moves Taken: " + moves;
    p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 3";

}

function displayModal(){
    const modalClose = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    modalClose.onclick = function(){
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function winGame(){
    if (matched.length === 16) {
        stopTime();
        AddStats();
        displayModal();
    }
}

deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI"){
        console.log(evt.target.nodeName + " was clicked");

        if (timerStart === false) {
            timeStart = true;
            timer();
        }

        flipCard();
    }

    function flipCard(){
        evt.target.classList.add("flip");
        addToOpened();

    }

    function addToOpened(){
        if (opened.length === 0 || opened.length === 1){
            opened.push(evt.target.firstElementChild);
        }

        compareTwo();
    }
});

reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click', function(){
    modal.style.display = "none";
    resetEverything();
});
