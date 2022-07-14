const grid = document.querySelector("#grid");
const keys = document.querySelectorAll(".key");
const tiles = document.querySelectorAll(".tile");
let pos = 0;
let line = 0;
let word = "";
let goal = "mason";

function checkWord(word) {
    let isWord = true;
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
    .then(res =>  {
        if (!res.ok) {
            isWord = false;
        }
    })
    return isWord;
}

function clicked(i) {
    const key = keys[i].innerHTML;
    if (key === "backspace") {
        if (pos === line * 5) { return; }
        pos--;
        word = word.slice(0, -1);
        tiles[pos].innerHTML = "";
    } else if (key === "enter") {
        if (pos !== ((line + 1) * 5) || line === 5) { return; }
        if (checkWord(word)) {
            if (word === goal) {
                alert("Congrats.");
            }
            line++;
        } else {
            alert("Not a word.");
            word = "";
            for (let i = 0; i < 5; i++) {
                pos--;
                tiles[pos].innerHTML = "";
            }
        }
        word = "";
    } else {
        if (pos !== ((line + 1) * 5) || pos === 0) {
            tiles[pos].innerHTML = key;
            word += key;
            pos++;
        }
    }
}

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function () { clicked(i) };
}