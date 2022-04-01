const words = [
    "dog", "fish", "pig", "movie", "music", "bread", "cake", "sea",
    "grass", "heat", "summer", "winter", "month"
];
let randomWord = "";
let clicked=[];
let result="";
let mistakes=0;


function selectItem(){
    randomWord = words[Math.floor(Math.random()*words.length)];
    document.querySelector(".letters").querySelectorAll("div").forEach(item=>{
        item.addEventListener("click",btnHandler);
    });
    window.addEventListener("keydown",keyHandler);
    console.log(randomWord);
};

function setUnderScores(){
    let splittedWord = randomWord.split("");
    let mappedWord = splittedWord.map(letter=> (clicked.indexOf(letter)>=0 ? letter : "_"));
    result = mappedWord.join("");
    document.querySelector(".target").innerHTML = result;
};

function checkIfWon(){
    if(randomWord === result){
        document.querySelector(".result").querySelector("h2").style.display = "block";
        document.querySelector(".result").querySelector("h2").innerText = "YOU WIN!";
        document.querySelector(".pic").querySelector("img").src = "./assets/winner.png";
        document.querySelector(".letters").querySelectorAll("div").forEach(item=>{
            item.removeEventListener("click", btnHandler);
        });
        window.removeEventListener("keydown",keyHandler);
    }
};

function checkIfLost(){
    const picture = document.querySelector(".pic").querySelector("img");
    picture.src = `./assets/hangman${mistakes}.png`;
    if (mistakes === 6){
        document.querySelector(".result").querySelector("h2").style.display = "block";
        document.getElementById("result").innerHTML = `secrete word: <span>${randomWord}</span>`;
        document.querySelector(".letters").querySelectorAll("div").forEach(item=>{
            item.removeEventListener("click", btnHandler);
        });
        window.removeEventListener("keydown",keyHandler);
    }
}

function letterHandler(letter){
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if(randomWord.indexOf(letter)>=0){
        setUnderScores();
        checkIfWon();
    } else if (randomWord.indexOf(letter) === -1){
        mistakes++;
        checkIfLost();
    }
};

function btnHandler(event){
    letterHandler(event.target.id);
};

function keyHandler(event){
    letterHandler(event.key);
}

selectItem();
setUnderScores();

const refresh = document.querySelector(".result").querySelector("button");
refresh.addEventListener("click",()=> {
    location.reload();
});