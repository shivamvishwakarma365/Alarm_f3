let setAlarmButton = document.getElementById('set-alarm-button');
let activeTimersDiv = document.getElementById('active-timers');
let idGiver = 1; 
let intervalIdMap = new Map(); 
setAlarmButton.addEventListener('click',() => {
     let timerDiv = document.createElement('div');
     let timerDivId = idGiver++;
     timerDiv.setAttribute('id',timerDivId); 
     timerDiv.setAttribute('class','active-timer') 
     let hrs = parseInt(document.getElementById('hours').value, 10);
     let mins = parseInt(document.getElementById('minutes').value, 10);
     let seconds = parseInt(document.getElementById('seconds').value, 10);
     if(isNaN(hrs) || isNaN(mins) || isNaN(seconds)){
        return; 
     }

     let time = hrs * 60 * 60 + mins * 60 + seconds; 
     time = time * 1000; 
 
     
     timerDiv.innerHTML = 
     `
     <h5>Time Left :</h5>
     <div class="active-timer-input-section">
          <span id="hrs">${hrs}</span>
          <span>:</span>
          <span id="mn">${mins}</span> 
          <span>:</span>
         <span id="ss">${seconds}</span>
     </div>
     <button class="btndelete" onclick="deleteActiveTimer(${timerDivId})">Delete</button>
     <button class="btnstop" onclick="deleteActiveTimer(${timerDivId})">Stop</button>
      `

     activeTimersDiv.appendChild(timerDiv);
     setTimer(timerDivId,time); 
   
})

function sayHello(timerDivId) {
    let timerDiv = document.getElementById(timerDivId); 
    let timerDiveChildren = timerDiv.children[1]; 
    const spans = timerDiveChildren.getElementsByTagName("span"); 
    let hrs = parseInt(spans[0].textContent); 
    let mins = parseInt(spans[2].textContent);
    let seconds = parseInt(spans[4].textContent);
    let time = hrs * 60 * 60 + mins * 60 + seconds;
    time-=1; 
    if(time === 0){
        
        timerDiveChildren.innerHTML = "Timer is Up!"
        timerDiv.children[0].innerHTML = '';
        timerDiv.style.backgroundColor='yellow'
        timerDiv.children[1].style.color='black'
        let finishButton = timerDiv.children[2];
        finishButton.style.display = 'none';
        let stopButton = timerDiv.children[3];
      
        stopButton.style.display = 'block';
        stopButton.style.backgroundColor = '#34344A';
        stopButton.style.color = 'white';
       

    }
    else{
      
        hrs = Math.floor(time / (60 * 60));
        time = time % (60 * 60);
        mins = Math.floor(time / (60));
        time = time % 60;
        seconds = time;
        spans[0].innerText = hrs;
        spans[2].innerText = mins;
        spans[4].innerText = seconds;
    }

}

function deleteActiveTimer(divId) {
    const parentElement = document.getElementById('active-timers');
    const divToRemove = document.getElementById(divId);
    let intervalId = intervalIdMap.get(divId); 
    intervalIdMap.delete(divId);
    if (divToRemove) {
        
        parentElement.removeChild(divToRemove);
        clearInterval(intervalId);

    } else {
        console.log("The specified div doesn't exist.");
    }
    

    
    
}
function FinishTimer(intervalId,timerDivId){
    clearInterval(intervalId);
}


function setTimer(timerDivId,time){
    const intervalId = setInterval(sayHello, 1000,timerDivId);
    intervalIdMap.set(timerDivId,intervalId);
    let timerDiv = document.getElementById('timerDivId');
    setTimeout(FinishTimer,time,intervalId,timerDivId)
}
