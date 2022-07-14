const grid = document.querySelector("#grid");
const keys = document.querySelectorAll(".key");
const tiles = document.querySelectorAll(".tile");
let pos = 0;
let line = 0;

function clicked(i) {
    const key = keys[i].innerHTML;
    if (key === "backspace") {
        if (pos === line * 5) { return; }
        pos--;
        tiles[pos].innerHTML = "";
    } else if (key === "enter") {
        if (pos !== ((line + 1) * 5) || line === 5) { return; }
        line++;
    } else {
        if (pos !== ((line + 1) * 5) || pos === 0) {
            tiles[pos].innerHTML = key;
            pos++;
        }
    }
}

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function () { clicked(i) };
}