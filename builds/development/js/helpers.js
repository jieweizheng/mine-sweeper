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
