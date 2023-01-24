const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d') 

const background = new Image()
background.src = "../images/background.png"








function startGame() {
   console.log("Starting the game")
   console.log("Background:", background)
   
   canvas.width = "1200"
   canvas.height = "600"
   canvas.style.visibility = "visible"
   ctx.drawImage(background, 0, 0, 1200, 600)
  
    
    
  }


window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
    };
}