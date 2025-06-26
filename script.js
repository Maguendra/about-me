//When the mouse is helf down, charge up power bar
//when mouse is released, move the ball as fare as the power bar is charge, then lower it back down
// variable pour la barre, reprendre à 1h25
//**************DATA**************
const powerbar = {
    chargedPercentage : 0,
    fillElem: document.querySelector("#powerbar-fill")
}
const game = {
    state : "pending" //"charging" "discharging"
}
const ball = {
    elem: document.querySelector("#ball"),
    cy: 97
}
//**************EVENT HANDLERS**************
//when the mouse is pressed, change state
window.addEventListener('pointerdown', ()=>{game.state = "charging"})

//when the mouse is released, change the state
window.addEventListener('pointerup', ()=>{game.state = "discharging"})


////**************HELPER FUNCTIONS**************
//periodically, increase the charge percentage
function updateChargedPercentage() {
    if(game.state == "pending") { return }    
    
    if(game.state == "charging") { 
        if(powerbar.chargedPercentage >= 100) { return }
        if(powerbar.chargedPercentage < 0){
            powerbar.chargedPercentage = 0
            game.state = "pending"
        }
        powerbar.chargedPercentage *= 1.03;
     }else{
         if(powerbar.chargedPercentage <= 0) { game.state == "pending" }else{
            powerbar.chargedPercentage -= 1.03;
         }
        
     }

    
}

function updateBallPosition() {
    if(game.state != "discharging") {return}

    ball.cy -= 0.5
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
    updateChargedPercentage()
    updateBallPosition()
    renderPowerbar()
    renderBall()
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)