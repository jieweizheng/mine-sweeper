function endGame(gameResult){
  stopTicking();
  message(gameResult === 'win'? 'You win! (PLay again)' : 'You Lose! (Play again)');
}

function checkWin(){
  if(allGrids.filter(function(grid){return !grid.isClicked;}).length === level)
    return true;
  return false;
}
