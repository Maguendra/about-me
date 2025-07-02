//**************DATA**************
const powerbar = {
    chargedPercentage : 0,
    fillElem: document.querySelector("#powerbar-fill")
}
const game = {
    state : "pending" //"start"
}
const ball = {
    elem: document.querySelector("#ball"),
    cy: 96,
    velocityY: -0.3,
    width: 6,  
    state: "ascending" // "ascending" "descending"
}
const play_button = document.querySelector("#play-button");

const instruction = document.querySelector("#instruction");

const cancel_button = document.querySelector("#cancel-button");






//**************INITIALIZATION**************
instruction.style.display = "none"; // Hide instruction initially 

//**************EVENT HANDLERS**************
//when the button is clicked, it disappears and the ball starts moving towards the top
play_button.addEventListener('click', ()=>{
    play_button.style.display = "none";
    game.state = "start";
    instruction.style.display = "flex"; // Show instruction when the game starts
    ball.velocityY = -Math.abs(ball.velocityY); // Ensure the ball moves upwards
})
//when the cancel button is clicked, the game stops
cancel_button.addEventListener('click', ()=>{
    game.state = "pending";
    ball.cy = 96; // Reset ball position
    play_button.style.display = "block"; // Show play button again
    instruction.style.display = "none"; // Hide instruction when the game ends
})

////**************HELPER FUNCTIONS**************

function updateInstructionRect() {   

    if (ball.cy >= 45 && ball.cy  <= 55) {
        instruction.style.opacity = 0;
    }else {
        instruction.style.opacity = 0.8;
    }
}

function updateBallPosition() {
    if(game.state != "start") {return}

    if(ball.cy <= 3 ) {
        ball.state = "descending"; 
        ball.velocityY *= -1
        }else if(ball.cy >= 97){
            ball.state = "ascending"; 
        ball.velocityY *= -1
        }


    ball.cy += ball.velocityY
}

function updateInstructionText() {
    if (ball.state === "descending") {
        instruction.textContent = "Breathe Out";
    } else {
        instruction.textContent = "Breathe In";
    }
}

function updateCancelButton() {
    if (game.state === "pending") {
        cancel_button.style.display = "none"; // Hide cancel button when game is pending
    }else{
        cancel_button.style.display = "flex"; // Show cancel button when game is active
    }
}



//**************RENDERING**************
function renderPowerbar(){
    powerbar.fillElem.style.width = `${powerbar.chargedPercentage}%`
}

function renderBall(){
    ball.elem.style.top = `${ball.cy}%`
}




//**************GAME LOOP**************
function gameLoop() {    
    updateInstructionRect()  
    updateCancelButton()
    updateBallPosition()
    updateInstructionText()      
    renderBall()
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)