const BOARD = document.querySelector("#board");
const HEADER = document.querySelector('#header');
const BTN = document.querySelector('#resetBtn');
const TIMER = document.querySelector('#timer');
const COUNT = document.querySelector('#counter');

var allGrids = [];
var level = 99; //99
var col = 30; //30
var row = 16; //16

var leftButtonDown = false;
var rightButtonDown = false;

var interval;
var time = 0;
var count = level;

var gameStart = false, gameEnd = false;

function clicked(id, e){
  if(!gameEnd){
    if (leftButtonDown && rightButtonDown) {
      bothClick(id);
      leftButtonDown = false;
      rightButtonDown = false;
    }
    else if (leftButtonDown){
      if (!gameStart){
        generateGrids(id);
        gameStart = true;
        tick();
      }
      leftClick(id);
      leftButtonDown = false;
    }
    else if (rightButtonDown){
      rightClick(id);
      rightButtonDown = false;
    }
    if(gameEnd){
      endGame('false');
    }
    else if (checkWin()) {
      endGame('win');
    }
  }
}

function bothClick(id){ //left and right buttons clicked together*************************************

  var adjGrids = findAdjGrids(id).filter(function(grid){return !grid.isClicked});
  if (allGrids[id].isClicked && allGrids[id].mineCount === countFlags(adjGrids)) {
    adjGrids.forEach(function(item){
      leftClick(parseInt(item.element.id));
    });
  }
}

function leftClick(id){
  var sweepingList = [allGrids[id]];
  var currentGrid, adjGrids, mines;
  while(sweepingList.length){
    currentGrid = sweepingList.shift()
    if (!currentGrid.isClicked && !currentGrid.flagged){
      currentGrid.isClicked = true;
      if (currentGrid.hasMine){
        currentGrid.element.innerHTML = '*';
        currentGrid.element.className += ' boom';
        gameEnd = true;
        continue;
      }
      adjGrids = findAdjGrids(parseInt(currentGrid.element.id));
      currentGrid.mineCount = countMines(adjGrids)
      currentGrid.flagged = false;
      if (!currentGrid.mineCount)
        sweepingList = sweepingList.concat(adjGrids);
      currentGrid.element.innerHTML = '<span>' + (currentGrid.mineCount ? currentGrid.mineCount : '') + '</span>';
      currentGrid.element.className += ' isClicked';
    }
  }
}

function rightClick(id){
  var grid = allGrids[id];
  if (!grid.isClicked){
    grid.flagged = !grid.flagged;
    if (grid.flagged){
      grid.element.innerHTML = 'F';
      count--;
    }
    else {
      grid.element.innerHTML = '';
      count++;
    }
  }
  updateCount(count);
}


function mouseDown(e){
  if (e.button === 0)
    leftButtonDown = true;
  if (e.button === 2)
    rightButtonDown = true;
}

function updateCount(count){
  COUNT.innerHTML = count.toString();
}

function endGame(gameResult){
  stopTicking();
  message(gameResult === 'win'? 'You win!' : 'You Lose!');
}

function checkWin(){
  if(allGrids.filter(function(grid){return !grid.isClicked;}).length === level)
    return true;
  return false;
}

init();
show();

function countMines(arr){
  return arr.filter(function(grid){
    return grid.hasMine;
  }).length;
}

function countFlags(arr){
  return arr.filter(function(grid){
    return grid.flagged;
  }).length;
}

function hasId(id) {
  return 0 <= id && id < allGrids.length;
}

function message(m){
  BTN.innerHTML = m;
}

function findAdjGrids(id, excludeFlagged = false){ //return the array of nearby 8 grids
  var result = [];
  for(var x = -1; x <= 1; x++){
    if ((id % col == 0 && x == -1) || (id % col == col - 1 && x == 1))
      continue;
    for (var y = -1; y <= 1; y++) {
      if ((id < col && y == -1) || (id >= col * (row - 1) && y == 1) || (x == 0 && y == 0))
        continue;
      var adjId = id + x + y * col;
      if (hasId(adjId))
        result.push(allGrids[adjId]);
    }
  }
  return result;
}

function init(){
  BOARD.style['min-width'] = ((25 * col) + 1).toString() + 'px';
  for (var i = 0; i < row * col; i++){
    var div = document.createElement('div');
    div.setAttribute('class', 'cell');
    div.setAttribute('onmouseup', 'clicked(parseInt(this.id), event)');
    div.setAttribute('onmousedown', 'mouseDown(event)');
    div.setAttribute('oncontextmenu', 'return false;');
    div.setAttribute('id', i);
    allGrids.push(
      {
        element: div,
        hasMine: false,
        flagged: false,
        isClicked: false,
        mineCount: null
      }
    );
  }

  updateTime(time);
  updateCount(count);
};

function generateGrids(id){
  var allGridsLen = allGrids.length;
  var gridList = [];
  for(let i = 0; i < allGridsLen; i++)
    gridList[i] = i;
  gridList.splice(id, 1);
  var minesLeft = level;
  while( minesLeft-- ){
    let randomIndex = Math.floor( Math.random() * gridList.length );
    allGrids[gridList[randomIndex]].hasMine = true;
    gridList.splice(randomIndex, 1);
  }
  gridList.push(id);
  for (var i = 0; i < gridList.length; i++)
    allGrids[gridList[i]].hasMine = false;
}

function show(){
  for(let i = 0; i < allGrids.length; i++){
    if (i % col == 0){
      var divRow = document.createElement('div');
      divRow.setAttribute('class', 'row');
      BOARD.appendChild(divRow);
    }
    divRow.appendChild(allGrids[i].element);
  }
}

function resetGame(){
  var i = 0;
  var child = null;
  while(child = BOARD.childNodes[i])
    if(child !== HEADER)
      BOARD.removeChild(child);
    else
      i++;

  allGrids = [];
  gameStart = false;
  gameEnd = false;
  time = 0;
  count = level;

  TIMER.innerHTML = '0';
  COUNT.innerHTML = count;

  stopTicking();

  init();
  show();

  message('Good Luck!');
}

function updateTime(time){
  TIMER.innerHTML = time.toString();
}

function tick(){
  interval = setInterval(function(){
    time += 1;
    updateTime(time);
  }, 1000);
}

function stopTicking(){
  clearInterval(interval);
}
