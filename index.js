const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d') 

const logo = document.getElementById("logo")

const background = new Image()
background.src = "images/background.png"

const skullyImage = new Image()
skullyImage.src = "images/player.png"

const collectible = new Image()
collectible.src = "images/collectible.png"

const crossbone = new Image() 
crossbone.src = "images/crossbones.png"

let startingX = 540
let startingY = 400



let createCollectiblesId
let animationLoopId
let gravityLoopId
let createCrossbonesId

let gameOn = false

let score = 0



class Collectible {
constructor() {
  this.x = Math.random() * 700; 
  this.y = 0; 
  this.width = 20 + Math.floor(Math.random() * 350);    
  this.height = 20; 
  this.gravity= 0.1;
  this.gravitySpeed = 1;
  this.points = 1;
}
  update() {
    this.gravitySpeed = this.gravitySpeed + this.gravity;
  }
  newPosition() {
  this.y = this.y + this.gravitySpeed;
    }

draw() {
  ctx.drawImage(collectible, this.x, this.y, 200, 150) 
}
}

class Crossbone {
  constructor() {
    this.x = Math.random() * 700; 
    this.y = 0; 
    this.width = 20 + Math.floor(Math.random() * 350);
    this.height = 20;
    this.gravity= 0.1;
    this.gravitySpeed = 1;
    this.points = -1;
  }
  update() {
    this.gravitySpeed = this.gravitySpeed + this.gravity;
  }
  newPosition() {
  this.y = this.y + this.gravitySpeed;
    }

draw() {
  ctx.drawImage(crossbone, this.x, this.y, 200, 150) 
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
      this.x = this.x - 20
    }, 
  
    moveRight: function() {
      this.x = this.x + 20
    },
  
    moveUp: function() {
      this.y = this.y - 20
    }, 
  
    moveDown: function() {
      this.y = this.y + 20 
    }
  }

  function checkCollision(collectible, i, array) {
    if (skully.y < collectible.y + collectible.height
      && collectible.y < skully.y + skully.height 
      &&  collectible.x < skully.x + skully.width 
      && collectible.x + collectible.width > skully.x) {
        score+= collectible.points
        array.splice(i, 1)
        console.log("Colliding")
      }

    
  }

  let collectiblesArray = []
  
  function createCollectibles() {
  
    createCollectiblesId = setInterval(() => {
      collectiblesArray.push(new Collectible())
    }, 3750)
  }

let crossboneArray = []

function createCrossbones() {

setTimeout(() => {
  createCrossbonesId = setInterval(() => {
    crossboneArray.push(new Crossbone())
  }, 3750)
  
}, 1875)

}


  
  function animationLoop() {
    animationLoopId = setInterval(() => {
      
      
      ctx.clearRect(0, 0, 1200, 600)
      
      ctx.drawImage(background, 0, 0, 1200, 600)
      ctx.fillStyle = "rgba(246, 246, 246, 0.5)"
      ctx.fillRect(0, 0, 1200, 600)

      
      
      skully.draw()
    // ctx.drawImage(skullyImage, 100, 100, 120, 100)
      for (let i = 0; i < collectiblesArray.length; i++) {
       
       
        collectiblesArray[i].newPosition()
        collectiblesArray[i].draw()
        if (collectiblesArray[i].y > canvas.height) {
          collectiblesArray.splice(i, 1)
        }
        checkCollision(collectiblesArray[i], i, collectiblesArray)
      }

      for (let i = 0; i < crossboneArray.length; i++) {     
       
        crossboneArray[i].newPosition()
        crossboneArray[i].draw()
        if (crossboneArray[i].y > canvas.height) {
          crossboneArray.splice(i, 1)
        }
        checkCollision(crossboneArray[i], i, crossboneArray)
      }
      showScore()
      if (score >= 7) {
        gameOver()
      }

      if (score < 0) {
        gameOver()
      }
    }, 16)
    
  }


  function showScore() {

    ctx.fillStyle = 'black'
    ctx.fillRect(500, 30, 150, 50)
  
    ctx.fillStyle = 'white'
    ctx.font = '24px serif'
    ctx.fillText(`Score: ${score}`, 530, 60)
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
    
     logo.style.visibility = "hidden"
     logo.style.height = "0px"
     
     canvas.width = "1200"
     canvas.height = "600"
     canvas.style.visibility = "visible"
  
     
     gameOn = true
     
     collectiblesArray = []
     crossboneArray = []
     skully.x = startingX; 
     skully.y = startingY; 

  
    //  ctx.drawImage(background, 0, 0, 1200, 600)
  
    animationLoop()
    createCollectibles()
    createCrossbones() 
    gravityLoop()
      
      
    }
    
    function gameOver () {
    
      gameOn = false 
    
      clearInterval(animationLoopId)
      clearInterval(gravityLoopId)
      clearInterval(createCollectiblesId)
      clearInterval(createCrossbonesId)
    
    
      ctx.clearRect(0, 0, 1200, 600)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, 1200, 600)
    
      if (score > 6) {
        ctx.fillStyle = 'white'
        ctx.font = '60px serif'
        ctx.fillText("Winner!", 500, 300)
      } else {
        ctx.fillStyle = 'white'
        ctx.font = '60px serif'
        ctx.fillText("Game Over! Try again.", 300, 300)
      }
    
      collectiblesArray = []
      score = 0
    
    }
  
  
function gravityLoop () {
  gravityLoopId = setInterval(() => {
    for (let i = 0; i < collectiblesArray.length; i++) {
      collectiblesArray[i].update()

    }
    for (let i = 0; i < crossboneArray.length; i++) {
      crossboneArray[i].update()

    }
  }, 50)
  

  
}



window.onload = function() {
  document.getElementById("start-button").onclick = function() {
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
