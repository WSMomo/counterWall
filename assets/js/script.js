//due array per assegnare i brick se positivi o se negativi e contatore
let arrayPos = [];
let arrayNeg = [];
let counterNumber = 0;


//costruzione DOM
const mainTag = document.querySelector('main');
// creazione elementi e assegnazione
const newCounter = newElement(mainTag, 'div', 'counter', String(counterNumber));
const counter = document.querySelector('.counter');
//parte sinistra/top
const newWall = newElement(mainTag, 'div', 'wall', '');
const wall = document.querySelector('.wall');

//parte destra/bottom
const newButtonsContainer = newElement(mainTag, 'div', 'buttons-container', '');
const buttonsContainer = document.querySelector('.buttons-container');
const newDecreaseButton = newElement(buttonsContainer, 'button', 'decrease-btn', '-');
const newResetButton = newElement(buttonsContainer, 'button', 'reset-btn', 'RESET')
const newIncreaseButton = newElement(buttonsContainer, 'button', 'increase-btn', '+');
const decreaseBtn = document.querySelector('.decrease-btn');
const resetBtn = document.querySelector('.reset-btn')
const increaseBtn = document.querySelector('.increase-btn');
increaseBtn.setAttribute('class', 'buttons');
resetBtn.setAttribute('class', 'buttons')
decreaseBtn.setAttribute('class', 'buttons');

const buttons = document.querySelectorAll('.buttons');

//fa il render ad ogni aggiunta
function renderWall(arr) {
    wall.innerHTML = '';
    arr.map((a) => {
        a = newElement(wall, 'div', 'newBrick', '');
    })
    checkOverflow();
}

//DA SISTEMARE
//controllo posizione cursore overflow
function checkOverflow() {
    if (arrayPos.length > 100) {
        wall.scrollTop = wall.scrollHeight - wall.clientHeight;
      } else if (arrayNeg.length > 100) {
        wall.scrollTop = wall.scrollHeight - wall.clientHeight;
}
}
//Click dei buttons
increaseBtn.addEventListener('click', () => {
    counterNumber++;
    counter.innerText = counterNumber;
    addOrRemovePos();
    changeBrickColor();
    buttonsHover();
})

decreaseBtn.addEventListener('click', () => {
    counterNumber--;
    counter.innerText = counterNumber;
    addOrRemoveNeg();
    changeBrickColor();
    buttonsHover();
})

resetBtn.addEventListener('click', ()=>{
    if(counterNumber>0){
        arrayPos = [];
    } else{
        arrayNeg = [];
    }
    counterNumber = 0;
        counter.innerText = counterNumber;
    wall.innerHTML = '';
    buttonsHover();

})


//funzione per aggiungere l'hover e toglierla dopo il click (per evitare hover permanente su mobile)
function buttonsHover(){
    if('ontouchstart' in document.documentElement){
        buttons.forEach((button)=>{
            button.addEventListener('touchstart', () =>{
                button.classList.add('hover');
            }, {passive: true});
            button.addEventListener('touchend', ()=>{
                button.classList.remove('hover');
        }, {passive: true});
        button.addEventListener('click', ()=>{
            button.classList.remove('hover');
        }, {passive:true}); 
        });
    } else {
        buttons.forEach((button)=>{
            button.addEventListener('mouseenter', ()=>{
                button.classList.add('hover');
            });
            button.addEventListener('mouseleave', ()=>{
                button.classList.remove('hover');
            });
        });
    }
}

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

//aggiunge o rimuove .reverse da wall(css)
function addOrRemoveReverse() {
    if (counterNumber >= 0) {
        wall.classList.remove('reverse');
    } else {
        wall.classList.add('reverse');
    }
}

//aggiunge o rimuove .hole e .brick (css)
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

