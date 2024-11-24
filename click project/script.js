console.log("------JavaScript-------");


let counter = 0;
let intervalID = null;
const element = document.getElementById("counter");
const speedInput = document.getElementById("speed");

// function startInterval() {
//     intervalID = setInterval(function () {
//         counter++;
//         element.querySelector("p").innerText = "Counter: " + counter;
//     }, 1000);
// }

function startInterval() {
    const speed = parseInt(speedInput.value, 10);
    intervalID = setInterval(function () {
        counter++;
        element.querySelector("p").innerText = "Counter: " + counter;
    }, speed);
}

function startCounter(){
    console.log("Start Counter");
    startInterval();
    
}

function pauseCounter(){
    console.log("Pause Counter");
    clearInterval(intervalID);
    intervalID=null;
}

function resetCounter() {
    console.log("Reset Counter");
    counter = 0;
    element.querySelector("p").innerText = "Counter: " + counter;
}