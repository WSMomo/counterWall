//due array per assegnare i brick se positivi o se negativi e contatore
let arrayPos = [];
let arrayNeg = [];
let counterNumber = 0;

//costruzione DOM
const mainTag = document.querySelector('main');
// creazione elementi e assegnazione
const newCounter = newElement(mainTag, 'div', 'counter', String(counterNumber));
const counter = document.querySelector('.counter');

//container
const newWall = newElement(mainTag, 'div', 'wall', '');
const wall = document.querySelector('.wall');
const rainbowBtn = document.querySelector('#rainbow-btn');
const newButtonsContainer = newElement(mainTag, 'div', 'buttons-container', '');
const buttonsContainer = document.querySelector('.buttons-container');

//parte bottom
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

buttonsHover();

//fa il render ad ogni aggiunta
function renderWall(arr) {
    wall.innerHTML = '';
    arr.map(() => {
        newElement(wall, 'div', 'newBrick', '');
    })
}




//Click dei buttons
increaseBtn.addEventListener('click', () => {
    counterNumber++;
    counter.innerText = counterNumber;
    addOrRemovePos();
    changeBrickColor();
    checkOverflow();
})

decreaseBtn.addEventListener('click', () => {
    counterNumber--;
    counter.innerText = counterNumber;
    addOrRemoveNeg();
    changeBrickColor();
    checkOverflow();
})

resetBtn.addEventListener('click', () => {
    if (counterNumber > 0) {
        arrayPos = [];
    } else {
        arrayNeg = [];
    }
    counterNumber = 0;
    counter.innerText = counterNumber;
    wall.innerHTML = '';
})

rainbowBtn.addEventListener('click', () => {
    randomRainbow();
    changeBrickColor();
})

//controllo posizione cursore overflow e lo posiziona all'ultimo elemento aggiunto
function checkOverflow() {
    const bricks = document.querySelectorAll('.newBrick');
    if (counterNumber > 100) {
        wall.scrollTop = wall.scrollHeight - wall.clientHeight;
    } else if (counterNumber < -100) {
        wall.scrollBy(0, -bricks[0].offsetHeight);
    }
}

//funzione per aggiungere l'hover e toglierla dopo il click (per evitare hover permanente su mobile con :hover css)
function buttonsHover() {
    if ('ontouchstart' in document.documentElement) {
        buttons.forEach((button) => {
            button.addEventListener('touchstart', () => {
                button.classList.add('hover');
            }, { passive: true });
            button.addEventListener('touchend', () => {
                button.classList.remove('hover');
            }, { passive: true });
            button.addEventListener('click', () => {
                button.classList.remove('hover');
            }, { passive: true });
        });
    } else {
        buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('hover');
            });
            button.addEventListener('mouseleave', () => {
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


//gestione colori
function changeBrickColor() {
    const bricks = document.querySelectorAll('.newBrick');
    const activeRainbow = rainbowBtn.classList.contains('active');
    bricks.forEach((brick) => {
        if(activeRainbow){
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            brick.style.backgroundColor = '#' + randomColor;
            if(counterNumber > 0){
                brick.style.border = '2px solid black';
            } else{
                brick.style.border = '2px solid white';
            }
        } else{
            if (counterNumber > 0) {
                brick.style.backgroundColor = 'white';
                brick.style.border = '2px solid black';
            } else {
                brick.style.backgroundColor = 'black';
                brick.style.border = '2px solid white';
            }
        }
    });
}


//rainbow
function randomRainbow() {
    if (rainbowBtn.classList.contains('active')) {
        rainbowBtn.classList.remove('active');
        rainbowBtn.style.backgroundColor = 'white';
        rainbowBtn.style.color = 'black';
    } else {
        rainbowBtn.classList.add('active');
        rainbowBtn.style.backgroundColor = '#'+ Math.floor(Math.random() * 16777215).toString(16);
        rainbowBtn.style.color = '#'+ Math.floor(Math.random() * 16777215).toString(16);
    }
}


//funzione creazione nuovi elementi
function newElement(position, tag, newClass, value) {
    let elem = document.createElement(tag);
    //controllo che posizione sia valida e sia un elemento
    if (!position || !(position instanceof Element)) {
        position = document.body;
    }
    //se c'è una classe inserita setto la classe
    if (newClass) {
        elem.setAttribute('class', newClass)
    }
    //se c'è un valore lo aggiungo
    if (value) {
        let text = document.createTextNode(value);
        elem.appendChild(text);
    }
    position.appendChild(elem);
}

