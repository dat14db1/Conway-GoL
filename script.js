let width = 30;
let height = 30;
let board = Array(width * height).fill(0)
let run = 1;
set(10, 10, 1, board)
set(10, 11, 1, board)
set(10, 12, 1, board)
setInterval(oneTick, 1000);

function get(x, y, board) {
    return board[x + (y * width)]
}

function set(x, y, val, board) {
    board[x + y * width] = val
}

function getNeighbours(x, y) {
    neighbours = 0
    for (let i = 0; i < 3; i++) {
        val = get(x + i - 1, y + 1, board)
        if (val != undefined) {
            neighbours += val
        }
        val = get(x + i - 1, y - 1, board)
        if (val != undefined) {
            neighbours += val
        }
    }
    val = get(x - 1, y, board)
    if (val != undefined) {
        neighbours += val
    }
    val = get(x + 1, y, board)
    if (val != undefined) {
        neighbours += val
    }

    return neighbours
}

function oneTick() {
    if (run) {
        vizualise()
        let newBoard = Array(width * height).fill(0);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                cell = get(i, j, board)
                console.log(cell)
                neighbours = getNeighbours(i, j)
                if (cell) {
                    if (neighbours < 2) {
                        set(i, j, 0, newBoard)
                    }
                    else if (neighbours == 2 || neighbours == 3) {
                        set(i, j, 1, newBoard)

                    }
                    else if (neighbours > 3) {
                        set(i, j, 0, newBoard)
                    }
                }
                else {
                    if (neighbours == 3) {
                        set(i, j, 1, newBoard)
                    }
                }
            }
        }
        for (let i = 0; i < board.length; i++) {
            board[i] = newBoard[i]
        }
    }
}

function logBoard() {
    for (let j = 0; j < height; j++) {
        //console.log("\n")
        row = "";
        for (let i = 0; i < width; i++) {
            val = get(i, j, board)
            console.log(val)
            row.concat(val)
        } console.log(row)
    }
}

function vizualise() {
    document.body.innerHTML = "";

    let boardGame = document.createElement("div");
    boardGame.className = "boardDiv";
    let tbl = document.createElement("table")

    for (let j = 0; j < height; j++) {
        let tr = tbl.insertRow();
        for (let i = 0; i < width; i++) {
            let cell = tr.insertCell();
            cell.addEventListener("click", function () { clicked(cell, i, j) });
            if (get(i, j, board)) {
                cell.className = "liveCell";
            }
            //dead cell
            else {
                cell.className = "deadCell";
            }
        }
    }
    boardGame.appendChild(tbl);
    document.body.appendChild(boardGame)

    btn = document.createElement("button");
    btn.innerHTML = "Toggle";
    btn.addEventListener("click", function () {
        paus();
    });
    document.body.appendChild(btn);
}

function paus(){
    run = !run
}


function clicked(cell, x, y) {
    if (!run) {
        if (cell.className == "liveCell") {
            cell.className = "deadCell";
            set(x, y, 0, board)
        } else {
            cell.className = "liveCell";
            set(x, y, 1, board)
        }
    }
}