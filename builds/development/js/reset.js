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
