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

const instruction_Rect = instruction.getBoundingClientRect();
console.log(instruction_Rect);
const game_Rect = document.querySelector("#game").getBoundingClientRect();





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

function updateInstructionRect() {
    let ballBottom = ball.cy + ball.width / 2;
    let ballTop = ball.cy - ball.width / 2;
    const instruction_Rect_Bottom_Pct = instruction_Rect.bottom / game_Rect.height * 100;
    const instruction_Rect_Top_Pct = instruction_Rect.top / game_Rect.height * 100;



    console.log("ballBottom: " + ballBottom);
    console.log("ballTop: " + ballTop); 
    console.log("instruction_Rect_Top_Pct " + instruction_Rect_Top_Pct);
    console.log("instruction_Rect_Bottom_Pct " + instruction_Rect_Bottom_Pct);

    if (ballBottom >= instruction_Rect_Top_Pct && ballTop  <= instruction_Rect_Bottom_Pct) {
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
    updateInstructionRect()    
    renderBall()
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)