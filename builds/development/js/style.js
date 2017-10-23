window.onresize = function(){
  updateSize();
}

function updateSize(){
  width = BOARD.clientWidth;
  height = window.innerHeight - BOARD.offsetTop;

  cellLength = Math.floor(Math.min(height / row, width / col) * 0.95);

  updateCellSize();
  updateRowSize();
}

function updateRowSize(){
  for(var i = 0; i < rows.length; i++){
    rows[i].style.height = '' + (cellLength + 1) + 'px';
  }
}

function updateCellSize(){
  for(var i = 0; i < cells.length; i++){
    cells[i].style.height = cells[i].style.width = cells[i].style.lineHeight = cellLength.toString() + 'px';
  }
}
