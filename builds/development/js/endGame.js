function endGame(gameResult){
  stopTicking();
  message(gameResult === 'win'? 'You win!' : 'You Lose!');
}

function checkWin(){
  if(allGrids.filter(function(grid){return !grid.isClicked;}).length === level)
    return true;
  return false;
}
