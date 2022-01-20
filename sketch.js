var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, iphoneImg, bombImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup, bombG, iphoneG;

//Esttados de Jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("fimdeJogo.png");
  iphoneImg = loadImage("iphone.jpg");
  bombImg = loadImage("bomb.png");
}

function setup(){
  
//crie uma tela

 createCanvas(windowWidth,windowHeight);

//plano de fundo se movendo

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//crie o menino correndo
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
iphoneG = new Group();
bombG = new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar o plano de fundo

   if(path.y > height ){
     path.y = height/2;
   }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createBomb();
    createIphone();
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else if(iphoneG.isTouching(boy)){
      iphoneG.destroyEach();
      treasureCollection= treasureCollection + 200;
    }else{
      if(swordGroup.isTouching(boy)||bombG.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        bombG.destroyEach();
        iphoneG.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        bombG.setVelocityYEach(0);
        iphoneG.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill('gold');
  text("Tesouro: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 350;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 350;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 350;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 350;
  swordGroup.add(sword);
  }
}
function createIphone(){
  if (World.frameCount % 670 == 0) {
  var iphone = createSprite(Math.round(random(50, width-50),40, 10, 10));
  iphone.addImage(iphoneImg);
  iphone.scale=0.1;
  iphone.velocityY = 3;
  iphone.lifetime = 350;
  iphoneG.add(iphone);
  }
}
function createBomb(){
  if (World.frameCount % 250 == 0) {
  var bomb = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.1;
  bomb.velocityY = 3;
  bomb.lifetime = 350;
  bombG.add(bomb);
  }
}
