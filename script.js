// x1====co ordinates of first block starting in the first row
// x2====co ordinates of first block starting in the second row
// x3====co ordinates of first block starting in the third row
// xLast====co ordinates of first block starting in the fourth row
// y1====row 1
// y2====row 2
// y3====row 3
// y4====row 4

const shapes = [
    {},
    {// O-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 2,
        rowsOcc: 2,
        sqIn1stRow: 2,
        x1: 10, x2: 10,
        x3: 0, xLast: 10,
        y1: 1, y2: 2,
        y3: 0, yLast: 2,
        color: "#b9fa05"
    },
    {// T-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 1,
        rowsOcc: 2,
        sqIn1stRow: 3,
        x1: 9, x2: 10,
        x3: 0, xLast: 10,
        y1: 1, y2: 2,
        y3: 0, yLast: 2,
        color: "#38d642"
    },
    {//I-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 0,
        rowsOcc: 1,
        sqIn1stRow: 4,
        x1: 9, x2: 0,
        x3: 0, xLast: 0,
        y1: 1, y2: 1,
        y3: 0, yLast: 1,
        color: "#0781fa"
    },
    {//Z-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 2,
        rowsOcc: 2,
        sqIn1stRow: 2,
        x1: 9, x2: 10,
        x3: 0, xLast: 10,
        y1: 1, y2: 2,
        y3: 0, yLast: 2,
        color: "#e64040"
    },
    {//J-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 3,
        rowsOcc: 2,
        sqIn1stRow: 1,
        x1: 9, x2: 9,
        x3: 0, xLast: 9,
        y1: 1, y2: 2,
        y3: 0, yLast: 2,
        color: "#eda413"
    },
    {//L-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 3,
        rowsOcc: 2,
        sqIn1stRow: 1,
        x1: 11, x2: 9,
        x3: 0, xLast: 9,
        y1: 1, y2: 2,
        y3: 0, yLast: 2,
        color: "#25e8aa"
    },
    {//S-block
        sq: 4,
        rotate: 0,
        sqInLastRow: 2,
        rowsOcc: 2,
        sqIn1stRow: 2,
        x1: 9, x2: 8,
        x3: 0, xLast: 8,
        y1: 1, y2: 2,
        y3: 0, yLast: 2,
        color: "#f035bb"
    }
]
let score = 0;
let maxColumnStart = 0;
let minColumnStart = 0;
let gridArr = [];
let allBlocks = []
let stoppedElemArr = [];
let stopRunCount = 0;
let ran;
let randomNo;
let collision = false;
let prevRan = 0;//previous random nuumber
let row, column;
let playArea = document.getElementById('grid-area');
let blocks = [];
let nextblocks = [];
let lastPaintTime = 0;
let tempSpeed = 0.5;
let speed = 0.5;//speed with which blocks fall
let scoreBoard = document.getElementById('scores')
let x1, x2, y1, y2, y3, yLast, x3, xLast, rotate, rowsOcc, sqIn1stRow, sqInLastRow, color;
let light = document.getElementById('light');
let dark = document.getElementById('dark');
let mode = document.getElementById('modes');
let body = document.getElementById('body');
let left = document.getElementById('left');
let right = document.getElementById('right');
let down = document.getElementById('down');
let up = document.getElementById('up');
let spacebar = document.getElementById('spacebar');
let gameover = document.getElementById('gameover');
let playagain = document.getElementById('again');

gameover.addEventListener('click', () => {
    location.reload();
})
mode.addEventListener('click', () => {
    light.classList.toggle('light-mode')
    dark.classList.toggle('light-mode')
    body.classList.toggle('color');
})
left.addEventListener('click', () => {
    left.style.backgroundColor = "#b4eb46";
    if (!checkCollisionLOrR("ArrowLeft")) {
        --x1;
        --x2;
        --x3;
        --xLast;
        showingBlocks("current");
    }
}) 
right.addEventListener('click', () => {
    right.style.backgroundColor = "#e65449";
    if (!checkCollisionLOrR("ArrowRight")) {
        ++x1;
        ++x2;
        ++x3;
        ++xLast;
        showingBlocks("current");
    }
})
up.addEventListener('click', ArrowUp)
down.addEventListener('click', () => {
    down.style.backgroundColor = "#4da9ff";
    speed = 0.005;
})
spacebar.addEventListener('click', () => {
    spacebar.style.backgroundColor = "#ff8e3d";
    tempSpeed = 0.00001;
})

// making a grid of the screen
for (let i = 0; i < 20; i++) {
    gridArr.push([]);
    for (let j = 0; j < 20; j++) {
        gridArr[i].push(0);
    }
}

function creatDivs() {
    // creating four divs
    for (let i = 0; i < 4; i++) {
        blocks[i] = document.createElement('div');
        blocks[i].classList.add('shapes');
    }
}
function generateRandom() {
    randomNo = Math.round((6 * Math.random()) + 1);
    if (prevRan == randomNo)
        generateRandom();
}
function assigningVar(num) {
    y1 = shapes[num].y1;
    y2 = shapes[num].y2;
    x1 = shapes[num].x1;
    x2 = shapes[num].x2;
    x3 = shapes[num].x3;
    xLast = shapes[num].xLast;
    y2 = shapes[num].y2;
    y3 = shapes[num].y3;
    yLast = shapes[num].yLast;
    rotate = shapes[num].rotate;
    rowsOcc = shapes[num].rowsOcc;
    sqIn1stRow = shapes[num].sqIn1stRow;
    sqInLastRow = shapes[num].sqInLastRow;
    color = shapes[num].color;
}
generateRandom();
creatDivs();
random();
prevRan = randomNo;
function random() {
    collision = false;
    ran = randomNo;
    assigningVar(ran);
    generateRandom();
    showNextBlock();
}

function showNextBlock() {
    let nextBlockArea = document.getElementById('nextblock');
    assigningVar(randomNo);
    let node = document.createTextNode('');
    nextBlockArea.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        nextblocks[i] = document.createElement('div');
        nextblocks[i].classList.add('shapes');
    }
    creatingBlocks("next");
    for (let i = 0; i < 4; i++) {
        nextblocks[i].style.gridColumnStart -= 7;
        nextblocks[i].style.gridRowStart = parseInt(nextblocks[i].style.gridRowStart) + 1;
    }
    for (let i = 0; i < 4; i++) {
        nextBlockArea.appendChild(nextblocks[i]);
    }
    assigningVar(ran);
}

function checkCollisionLOrR(arrowKey) {
    maxColumnStart = 0;
    c=0;d=0;
    minColumnStart = 20;
    if (blocks[0].style.gridRowStart > 2) {
        for (let i = 0; i < 4; i++) {
            if (blocks[i].style.gridColumnStart > maxColumnStart)
                maxColumnStart = blocks[i].style.gridColumnStart;
            if (blocks[i].style.gridColumnStart < minColumnStart)
                minColumnStart = blocks[i].style.gridColumnStart;
        }
        for (let i = 0; i < 4; i++) {
            collision=true;
            b = gridArr[(blocks[i].style.gridRowStart) - 1][(blocks[i].style.gridColumnStart)];//right block
            c = gridArr[(blocks[i].style.gridRowStart) - 1][(blocks[i].style.gridColumnStart) - 2];//left block
            console.log(c,d);
            if (c != 1 && minColumnStart >= 2 && arrowKey == "ArrowLeft") {
                collision = false;
                // return false;
            }
            else if (b != 1 && maxColumnStart <= 19 && arrowKey == "ArrowRight") {
                collision = false;
                // return false;
            }
            else {
                collision = true;
                // return true;
            }
        }
    }
}

function checkCollision() {
    for (let i = 0; i < 4; i++) {
        if (blocks[i].style.gridRowStart > 1 && stopRunCount >= 1 && collision == false && blocks[i].style.gridRowStart < 20) {
            a = gridArr[(blocks[i].style.gridRowStart)][(blocks[i].style.gridColumnStart) - 1];//down
            // d = gridArr[(blocks[i].style.gridRowStart) - 2][(blocks[i].style.gridColumnStart) - 1];
            if (a == 1) {
                collision = true;
                stop();
                return true;
            }
        }
        else {
            collision = false
            return false;
        }
    }
    return false;
}

function lineClear() {
    let times = 0;
    count = 0;
    let j;
    for (j = 19; j >= 16; j--) {
        let count = 0;
        for (let i = 0; i < 20; i++) {
            if (gridArr[j][i] == 1) {
                count++;
            }
        }
        if (count == 20) {
            stoppedElemArr = document.querySelectorAll('.stopped');
            console.log(j);
            count = 0;
            let node = document.createTextNode('')
            Array.from(stoppedElemArr).forEach(elem => {
                if (elem.style.gridRowStart == j + 1) {
                    playArea.replaceChild(node, elem);
                }
                elem.style.gridRowStart = parseInt(elem.style.gridRowStart) + 1;
                showingBlocks("current")
            });
            for (let m = 0; m < 20; m++) {
                gridArr[j][m] = 0;
            }
            for (let k = j; k > 0; k--) {
                for (let i = 0; i < 20; i++) {
                    if (gridArr[k][i] == 1) {
                        times++;
                        console.log(times);
                        gridArr[k][i] = 0
                        gridArr[k + 1][i] = 1;
                    }
                }
            }
            score += 40;
            scoreBoard.innerText = `Score: ${score}`
        }
    }
}
function stop() {
    stopRunCount++;
    if (collision == false)
        showingBlocks("current");
    for (let i = 0; i < 4; i++) {
        blocks[i].classList.add('stopped');
        gridArr[(blocks[i].style.gridRowStart) - 1][(blocks[i].style.gridColumnStart) - 1] = 1;
    }
    random();
    speed = 0.5;
    tempSpeed = 0.5;
    prevRan = randomNo;
    creatDivs();
    showingBlocks("current");
    collision = false;

}
window.requestAnimationFrame(main);

function main(ctime) {
    for (let i = 0; i < 20; i++) {
        if (gridArr[3][i] == 1) {
            gameover.style.visibility = "visible";
            playagain.style.visibility = "visible";
            return;
        }
    }
    // lineClear();
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < speed) {
        return;
    }
    lineClear();

    if (!checkCollision()) {
        if (yLast < 20) {
            showingBlocks("current");
            ++y1;
            ++y2;
            ++y3;
            ++yLast;
        }
        else {
            stop();
        }
    }
    lastPaintTime = ctime
}
setInterval(() => {
    left.style.backgroundColor = "white";
    down.style.backgroundColor = "white";
    right.style.backgroundColor = "white";
    up.style.backgroundColor = "white";
    spacebar.style.backgroundColor = "white";
}, 1000);
function creatingBlocks(state) {
    if (state == "current") {
        function stylingBlocks(i) {
            blocks[i].style.gridRowStart = j;
            blocks[i].style.gridColumnStart = k;
            blocks[i].style.backgroundColor = color;
            k++;
        }
    }
    else if (state == "next") {
        function stylingBlocks(i) {
            nextblocks[i].style.gridRowStart = j;
            nextblocks[i].style.gridColumnStart = k;
            nextblocks[i].style.backgroundColor = color;
            k++;
        }
    }
    // first row
    let j = y1;
    let k = x1;
    let i;
    for (i = 0; i < sqIn1stRow; i++) {
        stylingBlocks(i);
    }
    // middle rows
    j = y2;
    k = x2;
    if (rowsOcc - 2 == 1) {
        for (let m = 0; m < shapes[ran].sq - (sqIn1stRow + sqInLastRow); m++, i++) {
            stylingBlocks(i);
        }
    }
    else {
        let temp = 1;
        for (let l = 0; l < rowsOcc - 2; l++) {
            for (let m = i; m <= temp; m++, i++) {
                stylingBlocks(m);
            }
            temp++
            j = y3;
            k = x3;
        }
    }
    // last row
    j = yLast;
    k = xLast;
    for (let m = i; m < shapes[ran].sq; m++) {
        stylingBlocks(m);
    }
}

function showingBlocks(state) {
    speed = tempSpeed;
    creatingBlocks(state);
    for (let i = 0; i < blocks.length; i++) {
        playArea.appendChild(blocks[i]);
    }

}
function ArrowUp() {
    up.style.backgroundColor = "#ff4de1";
    if (ran == 2) {
        if (rotate == 0) {
            rotate = 90
            sqInLastRow = 1
            rowsOcc = 3
            sqIn1stRow = 1;
            x1 = x1
            x2 = x1 - 1
            xLast = x1
            y1 = y1; y2 = y1 + 1;
            yLast = y1 + 2;
            showingBlocks("current")
        }
        else if (rotate == 90) {
            rotate = 180
            sqInLastRow = 3
            rowsOcc = 2
            sqIn1stRow = 1;
            x1 = x1 + 1
            x2 = x1 - 1
            xLast = x1 - 1
            y1 = y1 - 1; y2 = y1 + 1;
            yLast = y1 + 1;
            showingBlocks("current")
        }
        else if (rotate == 180) {
            rotate = 270;
            sqIn1stRow = 1; sqInLastRow = 1;
            rowsOcc = 3;
            x1 = xLast; x2 = xLast;
            xLast = xLast;
            y1 = y1; y2 = y2; yLast = y2 + 1;
        }
        else if (rotate == 270) {
            rotate = 0;
            sqIn1stRow = 3; sqInLastRow = 1;
            rowsOcc = 2;
            x1 = x1; xLast = x1 + 1; x2 = xLast;
            y1 = y2; y2 = yLast; yLast = y2;
        }
    }
    else if (ran == 3) {
        if (rotate == 0) {
            rotate = 90
            verticalForRan3();
        }
        else if (rotate == 90) {
            rotate = 180
            horizontalForRan3();
        }
        else if (rotate == 180) {
            rotate = 270;
            verticalForRan3();
        }
        else if (rotate == 270) {
            rotate = 0;
            horizontalForRan3();
        }
    }
    else if (ran == 4) {
        if (rotate == 0) {
            rotate = 90
            verticalForRan4();
        }
        else if (rotate == 90) {
            rotate = 180
            horizontalForRan4();
        }
        else if (rotate == 180) {
            rotate = 270;
            verticalForRan4();
        }
        else if (rotate == 270) {
            rotate = 0;
            horizontalForRan4();
        }
    }
    else if (ran == 5) {
        if (rotate == 0) {
            rotate = 90
            sqInLastRow = 1
            rowsOcc = 3
            sqIn1stRow = 2;
            x1 = x1
            x2 = x1;cursor
            xLast = x2
            y1 = y1; y2 = y2;
            yLast = y2 + 1;
            showingBlocks("current")
        }
        else if (rotate == 90) {
            rotate = 180
            sqInLastRow = 1
            rowsOcc = 2
            sqIn1stRow = 3;
            x1 = x1
            x2 = x1 + 2
            xLast = x2
            y1 = y1; y2 = y2;
            yLast = y2;
            showingBlocks("current")
        }
        else if (rotate == 180) {
            rotate = 270;
            sqIn1stRow = 1; sqInLastRow = 2;
            rowsOcc = 3;
            x1 = x1; x2 = x1;
            xLast = x1 - 1;
            y1 = y1; y2 = y2; yLast = y2 + 1;
        }
        else if (rotate == 270) {
            rotate = 0;
            sqIn1stRow = 1; sqInLastRow = 3;
            rowsOcc = 2;
            x1 = x1; xLast = x1; x2 = xLast;
            y1 = y1; y2 = y2; yLast = y2;
        }
    }
    else if (ran == 6) {
        if (rotate == 0) {
            rotate = 90
            sqInLastRow = 2;
            rowsOcc = 3
            sqIn1stRow = 1;
            x1 = x1
            x2 = x1;
            xLast = x2
            y1 = y1; y2 = y2;
            yLast = y2 + 1;
            showingBlocks("current")
        }
        else if (rotate == 90) {
            rotate = 180
            sqInLastRow = 1
            rowsOcc = 2
            sqIn1stRow = 3;cursor
            x1 = x1
            x2 = x1
            xLast = x2
            y1 = y1; y2 = y2;
            yLast = y2;
            showingBlocks("current")
        }
        else if (rotate == 180) {
            rotate = 270;
            sqIn1stRow = 2; sqInLastRow = 1;
            rowsOcc = 3;
            x1 = x1; x2 = x1 + 1;
            xLast = x2;
            y1 = y1; y2 = y2; yLast = y2 + 1;
        }
        else if (rotate == 270) {
            rotate = 0;
            sqIn1stRow = 1; sqInLastRow = 3;
            rowsOcc = 2;
            x1 = x1; xLast = x1 - 2; x2 = xLast;
            y1 = y1; y2 = y2; yLast = y2;
        }
    }
    else if (ran == 7) {
        if (rotate == 0) {
            rotate = 90
            verticalForRan7();
        }
        else if (rotate == 90) {
            rotate = 180
            horizontalForRan7();
        }
        else if (rotate == 180) {
            rotate = 270;
            verticalForRan7();
        }
        else if (rotate == 270) {
            rotate = 0;
            horizontalForRan7();
        }
    }
}

function horizontalForRan7() {
    sqInLastRow = 2; rowsOcc = 2; sqIn1stRow = 2;
    x1 = x1 + 1
    x2 = x1 - 1; xLast = x2;
    y1 = y1; y2 = y2; yLast = y2;
    showingBlocks("current")
}
function verticalForRan7() {
    sqInLastRow = 1; rowsOcc = 3; sqIn1stRow = 1;
    x1 = x1; x2 = x1; xLast = x2 + 1
    y1 = y1; y2 = y2; yLast = y2 + 1;
    showingBlocks("current")
}
function verticalForRan3() {
    sqInLastRow = 1
    rowsOcc = 4
    sqIn1stRow = 1;
    x1 = x1 + 2
    x2 = x1
    x3 = x1
    xLast = x1
    y1 = y1; y2 = y1 + 1;
    y3 = y1 + 2; yLast = y1 + 3;
    showingBlocks("current")
}
function horizontalForRan3() {
    sqInLastRow = 0
    rowsOcc = 1
    sqIn1stRow = 4;
    x1 = x1 - 2;
    x2 = 0;
    xLast = x2
    y1 = y1; y2 = 0;
    yLast = y2;
    showingBlocks("current")
}
function verticalForRan4() {
    sqInLastRow = 1
    rowsOcc = 3
    sqIn1stRow = 1;
    x1 = x1
    x2 = x1 - 1
    xLast = x2
    y1 = y1; y2 = y1 + 1;
    yLast = y1 + 2;
    showingBlocks("current")
}
function horizontalForRan4() {
    sqInLastRow = 2
    rowsOcc = 2
    sqIn1stRow = 2;
    x1 = x1
    x2 = x1 + 1
    xLast = x2;
    y1 = y1; y2 = y1 + 1;
    yLast = y2;
    showingBlocks("current")
}
document.addEventListener('keydown', arrow => {
    switch (arrow.key) {
        case "ArrowUp":
            if (!checkCollisionLOrR("ArrowLeft") && !checkCollisionLOrR("ArrowRight"))
                ArrowUp();
            break;
        case "ArrowDown":
            down.style.backgroundColor = "#4da9ff";
            speed = 0.005;
            break;
        case "ArrowLeft":
            left.style.backgroundColor = "#b4eb46";
            checkCollisionLOrR(arrow.key)
            if (collision == false) {
                --x1;
                --x2;
                --x3;
                --xLast;
                showingBlocks("current");
            }
            break;
        case "ArrowRight":
            right.style.backgroundColor = "#e65449";
            checkCollisionLOrR(arrow.key)
            if (collision == false) {
                showingBlocks("current");
                ++x1;
                ++x2;
                ++x3;
                ++xLast;
            }
            break;
        case " ":
            spacebar.style.backgroundColor = "#ff8e3d";
            tempSpeed = 0.00001;
            break;
    }
})