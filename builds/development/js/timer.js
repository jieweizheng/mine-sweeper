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
