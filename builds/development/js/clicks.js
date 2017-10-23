function clicked(id, e){
  if(!gameEnd){
    if (leftButtonDown && rightButtonDown) {
      console.log(id);
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
        currentGrid.element.className += ' boom';
        gameEnd = true;
        continue;
      }
      adjGrids = findAdjGrids(parseInt(currentGrid.element.id));
      currentGrid.mineCount = countMines(adjGrids)
      currentGrid.flagged = false;
      if (!currentGrid.mineCount)
        sweepingList = sweepingList.concat(adjGrids);
      currentGrid.element.innerHTML = currentGrid.mineCount ? currentGrid.mineCount.toString() : '';
      currentGrid.element.className += ' isClicked';
    }
  }
}

function rightClick(id){
  var grid = allGrids[id];
  if (!grid.isClicked){
    grid.flagged = !grid.flagged;
    if (grid.flagged){
      grid.element.className += ' flagged';
      // var flag = document.createElement('img');
      // flag.src = './img/flag_24x24.png';
      // flag.className = 'flag';
      // grid.element.appendChild(flag);
      count--;
    }
    else {
      // grid.element.removeChild(grid.element.firstChild);
      grid.element.className = grid.element.className.replace(' flagged', '');
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
