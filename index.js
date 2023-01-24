const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d') 








function startGame() {
   console.log("Starting the game")
  
    
    canvas.width = "1200"
    canvas.height = "600"
    canvas.style.visibility = "visible"
  
    
    
  }


window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
    };
}