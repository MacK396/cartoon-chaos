const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d') 

const background = new Image()
background.src = "../images/background.png"

const skullyImage = new Image()
skullyImage.src = "../images/player.png"

const collectible = new Image()
collectible.src = "../images/collectible.png"

let startingX = 540
let startingY = 400



let createCollectiblesId
let animationLoopId
// let gravityLoopId

let gameOn = false

let score = 0



class Collectible {
constructor() {
  this.x = Math.random() * 700; 
  this.y = 0; 
  this.width = 20 + Math.floor(Math.random() * 350);    
  this.height = 20; 

  
}

newPosition() {
  this.y++ 
}


draw() {
  ctx.drawImage(collectible, this.x, 100, 200, 150) 
}
}


const skully = {
  
    x: startingX, 
    y: startingY, 
    width: 120, 
    height: 100, 
  
    draw: function() {
   
     
      ctx.drawImage(skullyImage, this.x, this.y, this.width, this.height)

    }, 
  
    moveLeft: function() {
      this.x = this.x - 15
    }, 
  
    moveRight: function() {
      this.x = this.x + 15
    },
  
    moveUp: function() {
      this.y = this.y - 15
    }, 
  
    moveDown: function() {
      this.y = this.y + 15 
    }
  }

  function checkCollision(collectible) {
    if (skully.y < collectible.y + collectible.height
      && collectible.y < skully.y + skully.height 
      &&  collectible.x < skully.x + skully.width 
      && collectible.x + collectible.width > skully.x) {
        gameOver() 
      }
  }

  let collectiblesArray = []
  
  function createCollectibles() {
  
    createCollectiblesId = setInterval(() => {
      collectiblesArray.push(new Collectible())
    }, 3750)
  }
  
  function animationLoop() {
    animationLoopId = setInterval(() => {
      
      
      ctx.clearRect(0, 0, 1200, 600)
      
      ctx.drawImage(background, 0, 0, 1200, 600)
      
      
      skully.draw()
    // ctx.drawImage(skullyImage, 100, 100, 120, 100)
      for (let i = 0; i < collectiblesArray.length; i++) {
        if (collectiblesArray[i].sharedX < -138) {
          collectiblesArray.splice(i, 1)
        }
        // collectiblesArray[i].update()
        collectiblesArray[i].draw()
      }
    }, 16)
  }


  function showScore() {

    ctx.fillStyle = 'black'
    ctx.fillRect(340, 10, 150, 50)
  
    ctx.fillStyle = 'white'
    ctx.font = '24px serif'
    ctx.fillText(`Score: ${score}`, 370, 40)
  }

  function updateCanvas() {
  
    ctx.clearRect(0, 0, 500, 700)
  
    ctx.drawImage(background, 0, 0, 500, 700)
  
    
    skully.draw() 
    for (let i = 0; i < collectiblesArray.length; i++) {
      if (collectiblesArray[i].y > canvas.height) {
        collectiblesArray.splice(i, 1) 
        score++ 
        console.log("This is the score", score, collectiblesArray)
      }
      checkCollision(collectiblesArray[i])
      collectiblesArray[i].newPosition()
      collectiblesArray[i].draw()
    }
    
    showScore()
    if (score === 15) {
      gameOver
    }
    
  }
  
  function startGame() {
     console.log("Starting the game")
    
  
     gaemOn = true
     
     collectiblesArray = []
     skully.x = startingX; 
     skully.y = startingY; 
  
  
  
     canvas.width = "1200"
     canvas.height = "600"
     canvas.style.visibility = "visible"
    //  ctx.drawImage(background, 0, 0, 1200, 600)
  
    animationLoop()
    createCollectibles()
    // gravityLoop()
      
      
    }
    
    function gameOver () {
    
      gameOn = false 
    
      clearInterval(animationLoopId)
      // clearInterval(gravityLoopId)
      clearInterval(createCollectiblesId)
    
    
      ctx.clearRect(0, 0, 500, 700)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, 500, 700)
    
      if (score > 14) {
        ctx.fillStyle = 'white'
        ctx.font = '40px serif'
        ctx.fillText("You've won!", 150, 200)
      } else {
        ctx.fillStyle = 'white'
        ctx.font = '40px serif'
        ctx.fillText("You've lost!", 150, 200)
      }
    
      collectiblesArray = []
      score = 0
    
    }
  
  



















// function gravityLoop () {
//   gravityLoopId = setInterval(() => {
//     skully.update ()
//   }, 50)
  
  
// }




window.onload = function() {
  document.getElementById("start-button").onclick = function() {
      startGame();
      if (gameOn === false) {
        startGame(); 
      }
    };

    

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 38:
          skully.moveUp();
          break;
        case 40:
          skully.moveDown();
          break;
        case 37:
          skully.moveLeft();
          break;
        case 39:
          skully.moveRight();
  
          break;
      }
      // updateCanvas();
    });
    
    };
