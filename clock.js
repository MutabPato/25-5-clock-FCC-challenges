let breakIncrementButton=document.getElementById('break-increment');
let breakDecrementButton=document.getElementById('break-decrement');
let sessionIncrementButton=document.getElementById('session-increment');
let sessionDecrementButton=document.getElementById('session-decrement');
let startStopButton=document.getElementById('start_stop');
let resetButton=document.getElementById('reset');

let breakLength=document.getElementById('break-length');
let sessionLength=document.getElementById('session-length');
let timeLeft=document.getElementById('time-left');

let timer;
let timerStatus = "stopped"; // Timer starts in the stopped state
let currentTimer = "session"; // Tracks the current timer (session or break)
let sessionDuration = parseInt(sessionLength.innerText);
let breakDuration = parseInt(breakLength.innerText);

breakIncrementButton.addEventListener("click", () => {
    if (breakDuration < 60) {
      breakDuration++;
      breakLength.innerText = breakDuration;
      if (currentTimer === "break") {
        timeLeft.innerText = breakDuration.toString().padStart(2, "0") + ":00";
      }
    }
  });

  breakDecrementButton.addEventListener("click", () => {
    if (breakDuration > 1) {
      breakDuration--;
      breakLength.innerText = breakDuration;
      if (currentTimer === "break") {
        timeLeft.innerText = breakDuration.toString().padStart(2, "0") + ":00";
      }
    }
  });

  sessionIncrementButton.addEventListener("click", () => {
    if (sessionDuration < 60) {
      sessionDuration++;
      sessionLength.innerText = sessionDuration;
      if (currentTimer === "session") {
        timeLeft.innerText = sessionDuration.toString().padStart(2, "0") + ":00";
      }
    }
  });
  
  sessionDecrementButton.addEventListener("click", () => {
    if (sessionDuration > 1) {
      sessionDuration--;
      sessionLength.innerText = sessionDuration;
      if (currentTimer === "session") {
        timeLeft.innerText = sessionDuration.toString().padStart(2, "0") + ":00";
      }
    }
  });

startStopButton.addEventListener("click", () => {
    if (timerStatus === "begin" || timerStatus === "stopped"){
        //start the timer
        console.log('start the timer');
        timerStatus="counting";
        timer=setInterval(() => { 
            timeLeft.innerText=decrementTime(timeLeft.innerText);
        },1000);
    } else if (timerStatus === "counting"){
        //stop the timer
        console.log('stop the timer');
        timerStatus="stopped";
       clearInterval(timer);
    }
})

/*resetButton.addEventListener("click", () => {
    console.log('reset button clicked');
    clearInterval(timer);
    timerStatus="stopped";
    timeLeft.innerText = "25:00"; // Reset the time display
})*/
resetButton.addEventListener("click", () => {
  clearInterval(timer);
  timerStatus = "stopped";
  sessionDuration = 25;
  breakDuration = 5;
  sessionLength.innerText = sessionDuration;
  breakLength.innerText = breakDuration;
  if (currentTimer === "session") {
    timeLeft.innerText = sessionDuration.toString().padStart(2, "0") + ":00";
  } else {
    timeLeft.innerText = breakDuration.toString().padStart(2, "0") + ":00";
  }
});


function decrementTime(timeString){
    let timeDisplay=timeString.split(":");
    let minuteDisplay=parseInt(timeDisplay[0]);
    let secondDisplay=parseInt(timeDisplay[1]);

    secondDisplay-=1;
    if(secondDisplay === -1){
        secondDisplay=59;
        minuteDisplay-=1;
    }
    if(secondDisplay<=9){
        secondDisplay="0"+secondDisplay;
    }

    return minuteDisplay+":"+secondDisplay; 
}

/*function decrementTime(timeString) {
  let timeDisplay = timeString.split(":");
  let minuteDisplay = parseInt(timeDisplay[0]);
  let secondDisplay = parseInt(timeDisplay[1]);

  secondDisplay -= 1;
  if (secondDisplay === -1) {
    secondDisplay = 59;
    minuteDisplay -= 1;
  }
  if (secondDisplay <= 9) {
    secondDisplay = "0" + secondDisplay;
  }

  if (minuteDisplay === 0 && secondDisplay === "00") {
    // Timer reached 00:00, switch to break timer
    if (currentTimer === "session") {
      currentTimer = "break";
      timeLeft.innerText = breakDuration.toString().padStart(2, "0") + ":00";
      document.getElementById("timer-label").innerText = "Break";
    } else {
      currentTimer = "session";
      timeLeft.innerText = sessionDuration.toString().padStart(2, "0") + ":00";
      document.getElementById("timer-label").innerText = "Session";
    }
  }

  return minuteDisplay + ":" + secondDisplay;
}*/
