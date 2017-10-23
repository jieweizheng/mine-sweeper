function init(){

  BOARD.onmousedown = function(e){
    mouseDown(e);
  };

  BOARD.onmouseup = function(e){
    clicked(parseInt(e.target.id), e)
  };

  BOARD.oncontextmenu = function(){
    return false;
  };

  for (var i = 0; i < row * col; i++){
    var div = document.createElement('div');
    div.setAttribute('class', 'cell');
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

  rows = document.getElementsByClassName('row');
  cells = document.getElementsByClassName('cell');

  updateTime(time);
  updateCount(count);

  show();
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
  updateSize();
}
