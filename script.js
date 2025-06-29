//**************DATA**************
const powerbar = {
    chargedPercentage : 0,
    fillElem: document.querySelector("#powerbar-fill")
}
const game = {
    state : "pending" //"end" "start"
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

////**************HELPER FUNCTIONS**************


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


//**************RENDERING**************
function renderPowerbar(){
    powerbar.fillElem.style.width = `${powerbar.chargedPercentage}%`
}

function renderBall(){
    ball.elem.style.top = `${ball.cy}%`
}




//**************GAME LOOP**************
function gameLoop() {    
    updateBallPosition()
    updateInstructionText()    
    renderBall()
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)