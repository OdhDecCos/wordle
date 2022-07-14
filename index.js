const grid = document.querySelector("#grid");
const keys = document.querySelectorAll(".key");
const tiles = document.querySelectorAll(".tile");

let keyObj = {};
let pos = 0;
let line = 0;
let word = "";
let goal = "liver";

function colourTiles(word, line, keyNum) {
    for(let i = 0; i < word.length; i++) {
        if (word[i] === goal[i]) {
            tiles[line*5 + i].setAttribute("data-tile", "correct");
            keys[keyObj[word[i]]].setAttribute("data-tile", "correct");
        } else if (goal.includes(word[i])) {
            tiles[line*5 + i].setAttribute("data-tile", "present");
            keys[keyObj[word[i]]].setAttribute("data-tile", "present");
        } else {
            tiles[line*5 + i].setAttribute("data-tile", "absent");
            keys[keyObj[word[i]]].setAttribute("data-tile", "absent");
        }
    }
}

async function clicked(keyNum) {
    const key = keys[keyNum].innerHTML;
    if (key === "backspace") {
        if (pos === line * 5) { return; }
        pos--;
        word = word.slice(0, -1);
        tiles[pos].innerHTML = "";
    } else if (key === "enter") {
        if (pos !== ((line + 1) * 5) || line === 5) { return; }
        let isWord;
        await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(res => {
            if (res.ok) { isWord = true; } else { isWord = false;}
        });
        if (isWord) {
            colourTiles(word, line, keyNum);
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
    keyObj[keys[i].innerHTML] = i;
}