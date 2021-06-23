var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;
var oppPinkImg1, oppPinkImg2;
var oppYellowImg1, oppYellowImg2;
var oppRedImg1, oppRedImg2;
var player1, player2, player3;

var cycleBell, gameOverImg;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameOver, restart;
var distance = 0;

var pinkCG, yellowCG, redCG;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation(
    "images/mainPlayer1.png",
    "images/mainPlayer2.png"
  );
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  oppPinkImg1 = loadAnimation("opponent1.png", "opponent2.png");
  oppPinkImg2 = loadAnimation("opponent3.png");
  oppYellowImg1 = loadAnimation("opponent4.png", "opponent5.png");
  oppYellowImg2 = loadAnimation("opponent6.png");
  oppRedImg1 = loadAnimation("opponent7.png", "opponent8.png");
  oppRedImg2 = loadAnimation("opponent9.png");

  cycleBell = loadSound("sound/bell.mp3");

  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1200, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.addAnimation("Sahilcollided", mainRacerImg2);
  mainCyclist.scale = 0.07;

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();

  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  if (gameState === PLAY) {
    mainCyclist.y = World.mouseY;
    
    path.velocityX = -5;
    
    distance = distance+Math.round(getFrameRate()/60)
    
    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }
    
  if(keyDown("space")) {
    cycleBell.play();
  }  
  
  var selectPlayer = Math.round(random(1,3));
    if(World.frameCount % 150 === 0) {
      if(selectPlayer === 1) {
          pinkCyclist();
      }
      else if(selectPlayer === 2) {
        yellowCyclist();
      }
      else {
        redCyclist();
      }
    }
    
    if (pinkCG.isTouching(mainCyclist)) {
      gameState = END;
      pinkCG.setVelocityXEach(0);
      player1.changeAnimation("collided_opponent1", oppPinkImg2);
    }
    
     if (yellowCG.isTouching(mainCyclist)) {
      gameState = END;
      yellowCG.setVelocityXEach(0);
      player2.changeAnimation("collided_opponent2", oppYellowImg2);
    }

     if (redCG.isTouching(mainCyclist)) {
      gameState = END;
      redCG.setVelocityXEach(0);
      player3.changeAnimation("collided_opponent3", oppRedImg2);
    }
    
  }
  
  else if(gameState === END) {
    
    textSize(20);
    fill("white");
    text("Press UP arrow key to restart the game", 500, 200);
    
    
    
    gameOver.visible = true;
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.changeAnimation("Sahilcollided", mainRacerImg2);
    
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
        
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
        
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if( keyDown("UP_ARROW")) {
      reset();
    }
  } 
  
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.changeAnimation("SahilRunning", mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}

function pinkCyclist() {
  player1 = createSprite(1100, Math.round(random(50, 250)))
  player1.addAnimation("opponent1", oppPinkImg1);
  player1.addAnimation("collided_opponent1", oppPinkImg2);
  player1.scale = 0.06;
  player1.velocityX = -6;
  player1.lifetime = 200;
  pinkCG.add(player1)
}

function yellowCyclist() {
  player2 = createSprite(1100, Math.round(random(50, 250)))
  player2.addAnimation("opponent2", oppYellowImg1);
  player2.addAnimation("collided_opponent2", oppYellowImg2);
  player2.scale = 0.06;
  player2.velocityX = -6;
  player2.lifetime = 200;
  yellowCG.add(player2)
}

function redCyclist() {
  player3 = createSprite(1100, Math.round(random(50, 250)))
  player3.addAnimation("opponent3", oppRedImg1);
  player3.addAnimation("collided_opponent3", oppRedImg2);
  player3.scale = 0.06;
  player3.velocityX = -6;
  player3.lifetime = 200;
  redCG.add(player3)
}