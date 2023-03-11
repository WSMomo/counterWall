//costruzione DOM
const mainTag = document.querySelector('main');
let counterNumber = 0;
// creazione elementi e assegnazione
const newCounter = newElement(mainTag, 'div', 'counter', String(counterNumber));
const counter = document.querySelector('.counter');
//parte sinistra/top
const newWall = newElement(mainTag, 'div', 'wall', '');
const wall = document.querySelector('.wall');


//parte destra/bottom
const newButtonsContainer = newElement(mainTag, 'div', 'buttons-container', '');
const buttonsContainer = document.querySelector('.buttons-container');
const newIncreaseButton = newElement(buttonsContainer, 'button', 'increase-btn', '+');
const newDecreaseButton = newElement(buttonsContainer, 'button', 'decrease-btn', '-');
const increaseBtn = document.querySelector('.increase-btn');
const decreaseBtn = document.querySelector('.decrease-btn');
increaseBtn.setAttribute('class', 'buttons');
decreaseBtn.setAttribute('class', 'buttons');

//due array per assegnare i brick se positivi o se negativi
let arrayPos = [];
let arrayNeg = [];

//funzioni per aggiungere o togliere i brick dai rispettivi array
function addOrRemovePos() {
    if (arrayNeg.length <= 0) {
        let newBrick;
        arrayPos.push(newBrick);
        renderWall(arrayPos);
    } else {
        arrayNeg.pop();
        renderWall(arrayNeg);
    }

    addOrRemoveReverse();
}

function addOrRemoveNeg() {
    if (arrayPos.length <= 0) {
        let newBrick;
        arrayNeg.push(newBrick);
        renderWall(arrayNeg);
    } else {
        arrayPos.pop();
        renderWall(arrayPos);
    }
    addOrRemoveReverse();
}

//fa il render ad ogni aggiunta
function renderWall(arr) {
    wall.innerHTML = '';
    arr.map((a) => {
        a = newElement(wall, 'div', 'newBrick', '');
    })
}


//Click dei buttons
increaseBtn.addEventListener('click', () => {
    counterNumber++;
    counter.innerText = counterNumber;
    addOrRemovePos();
    changeBrickColor();
})

decreaseBtn.addEventListener('click', () => {
    counterNumber--;
    counter.innerText = counterNumber;
    addOrRemoveNeg();
    changeBrickColor();
})



//aggiunge o rimuove classe reverse da wall
function addOrRemoveReverse() {
    if (counterNumber >= 0) {
        wall.classList.remove('reverse');
    } else {
        wall.classList.add('reverse');
    }
}

function changeBrickColor() {
    let bricks = document.querySelectorAll('.newBrick');
    bricks.forEach((brick) => {
        if (counterNumber >= 0) {
            brick.classList.add('brick');
            brick.classList.remove('hole');
        } else {
            brick.classList.remove('brick');
            brick.classList.add('hole');
        }
    });
}






//funzione creazione nuovi elementi
function newElement(position, tag, newClass, value) {
    let elem = document.createElement(tag);
    //controllo che posizione sia valido e sia un elemento
    if (!position || !(position instanceof Element)) {
        position = document.body;
    }
    //se c'è una classe inserita setto la classe
    if (newClass) {
        elem.setAttribute('class', newClass)
    }
    if (value) {
        let text = document.createTextNode(value);
        elem.appendChild(text);
    }
    position.appendChild(elem);
}

