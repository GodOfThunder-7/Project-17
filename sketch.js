var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;  

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  ground = createSprite(300,400,1200,25);
  ground.velocityX = -5;
  
  monkey = createSprite(100,350,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  background(255);
if (gameState === PLAY){
  if (keyDown("space")&& monkey.y >= 326.1){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground)
  if(ground.x < 0){
    ground.x = ground.width/2;
}    
    stroke("white");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: "+ survivalTime,100,50);
  
  if (monkey.isTouching(obstacleGroup)){
    gameState = END;
    
}
  spawnFood();
  spawnObstacle();

}
  if (gameState === END){
  monkey.velocityY = 0;
  ground.velocityX = 0;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.destroy();
  ground.destroy();
  textSize(30);
  text("Game Over",150,200);
}
 drawSprites();
}
function spawnFood(){
  if (frameCount % 80 === 0){
    banana = createSprite (600,Math.round(random(120,200)),20,20);
    banana.addAnimation ("banana", bananaImage);
    banana.velocityX = ground.velocityX;
    banana.lifetime = 300; 
    banana.scale = 0.1;
    FoodGroup.add(banana);
}
}
function spawnObstacle(){
  if (frameCount % 120 === 0){
    obstacle = createSprite(600,380,20,20);
    obstacle.addAnimation ("obstacle", obstacleImage);
    obstacle.velocityX = ground.velocityX;
    obstacle.lifetime = 300;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}