const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d') 

const background = new Image()
background.src = "../images/background.png"

const skullyImage = new Image()
skullyImage.src = "../images/player.png"

const collectible = new Image()
collectible.src = "../images/collectible.png"

const startingX = canvas.width/2 - 25
const startingY = canvas.height - 120



let collectiblesIntervalId
let animationLoopId
let gravityLoopId

let gameOn = false

let score = 0



const skully = {
  x: 400, 
  y: 200, 
  width: 50, 
  height: 100, 
  speedX: 0, 
  speedY: 0, 
  gravity: 0.1, 
  gravitySpeed: 0, 
  update: function() {
    console.log("Gravity speed", this.gravitySpeed)
    this.gravitySpeed = this.gravitySpeed + this.gravity
  }, 
  newPosition: function() {
    this.y = this.y + this.gravitySpeed
  }
  
}


class Collectible {
  constructor() {
    this.x = Math.random() * 700; 
    
    this.y = 0; 

    this.width = 20 + Math.floor(math.random() * 350); 
    
    this.height = 20; 

    
  }
  
  update() {
    this.sharedX = this.sharedX - 2
  }
  
  draw() {
    ctx.drawImage(collectible, this.x, this.y, this.width, this.height)
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

function createCollectibles () {

  collectiblesIntervalId = setInterval(() => {
    collectiblesArray.push(new Collectible())
    console.log("Collectibles:", collectiblesArray)
  }, 3750)
}

function animationLoop () {
  animationLoopId = setInterval(() => {
    
    skully.newPosition()
    
    ctx.clearRect(0, 0, 1200, 600)
    
    ctx.drawImage(background, 0, 0, 1200, 600)
    
    ctx.drawImage(skullyImage, skully.x, skully.y, 75, 50)
    
    for (let i = 0; i < collectiblesArray.length; i++) {
      if (collectiblesArray[i].sharedX < -138) {
        collectiblesArray.splice(i, 1)
      }
      collectiblesArray[i].update()
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


function gravityLoop () {
  gravityLoopId = setInterval(() => {
    skully.update ()
  }, 50)
  
  
}

function startGame() {
   console.log("Starting the game")
   console.log("Background:", background)

   gaemOn = true
   
   collectiblesArray = []
   skully.x = startingX; 
   skully.y = startingY; 



   canvas.width = "1200"
   canvas.height = "600"
   canvas.style.visibility = "visible"
   ctx.drawImage(background, 0, 0, 1200, 600)

  animationLoop()
  createCollectibles()
  gravityLoop()
    
    
  }

  function gameOver () {

    gameOn = false 

    clearInterval(animationLoopId)
    clearInterval(gravityLoopId)
    clearInterval(createCollectibles)


    ctx.clearRect(0, 0, 500, 700)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 500, 700)

    if (scre > 14) {
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
        skully.gravitySpeed = skully.gravitySpeed - 0.2;
        break; 
      }
    })
    
    };
