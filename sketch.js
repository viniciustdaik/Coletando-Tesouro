var path, boy;//, cash, diamonds, jwellery, sword;
var pathImg, boyImg, powerimg, 
cashImg, diamondsImg, jwelleryImg, iphoneImg, coinimg, 
swordImg, bombImg;
var treasureCollection = 0;
var hightreasureCollection = 0;
var cashG, diamondsG, jwelleryG, iphoneG, coinG, 
swordGroup, bombG, 
bombSound, swordSound;

//Estados de Jogo.
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  powerimg = loadImage("power.png");
  cashImg = loadImage("./money/cash.png");
  coinimg = loadImage("./money/coin.png");
  diamondsImg = loadImage("./money/diamonds.png");
  jwelleryImg = loadImage("./money/jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("fimdeJogo.png");
  iphoneImg = loadImage("./money/iphone.jpg");
  bombImg = loadImage("./bomb/bomb.png");
  //bombSound = loadSound("");
  //swordSound = loadSound("");
}

function setup(){
  //crie uma tela
  createCanvas(windowWidth, windowHeight);

  //plano de fundo se movendo

  path = createSprite(width/2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //crie o menino correndo
  boy = createSprite(width/2, height-20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg); 
  boy.addAnimation("End", endImg);
  boy.scale = 0.08;
  
  edges = createEdgeSprites();

  cashG = new Group();
  coinG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
  iphoneG = new Group();
  bombG = new Group();

}

function draw() {
  
  //código para reiniciar o plano de fundo
 
  if(gameState == END){
    fill('cyan');
    stroke('green');
    textSize(20);
    text("Clique/Toque Para Tentar De Novo.", width/2-135 , boy.y+55);
    if(mousePressedOver(path)
    ||mousePressedOver(boy)
    ||touches.length > 0){
      reset();
      touches = [];
    }
  }
  if(gameState === PLAY){
    background(0);
    boy.x = World.mouseX;
    if(path.y > height ){
      path.y = height/2;
    }
    boy.collide(edges);
  
    createCash();
    createCoin();
    createDiamonds();
    createJwellery();
    createSword();
    createBomb();
    createIphone();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }else if(coinG.isTouching(boy)){
      coinG.destroyEach();
      treasureCollection = treasureCollection + 75;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }else if(iphoneG.isTouching(boy)){
      iphoneG.destroyEach();
      treasureCollection = treasureCollection + 200;
    }else{
      if(swordGroup.isTouching(boy)){//||bombG.isTouching(boy)) {
        //swordSound.play();
        gameState = END;
        
        boy.changeAnimation("End", endImg);
        boy.x = width/2;
        boy.y = height/2;
        boy.scale = 0.6;
        
        cashG.destroyEach();
        coinG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        bombG.destroyEach();
        iphoneG.destroyEach();
        
        cashG.setVelocityYEach(0);
        coinG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        bombG.setVelocityYEach(0);
        iphoneG.setVelocityYEach(0);
     
    }else if(bombG.isTouching(boy)){
      //bombSound.play();
      gameState = END;
        
      boy.changeAnimation("End", endImg);
      boy.x = width/2;
      boy.y = height/2;
      boy.scale = 0.6;
      
      cashG.destroyEach();
      coinG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();
      bombG.destroyEach();
      iphoneG.destroyEach();
      
      cashG.setVelocityYEach(0);
      coinG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
      bombG.setVelocityYEach(0);
      iphoneG.setVelocityYEach(0);

    }else{
    }
  }
  
  drawSprites();
  textSize(20);
  fill('gold');
  stroke('green');
  text("Tesouro: "+ treasureCollection,width-150,30);
  text("Maior Tesouro: "+ hightreasureCollection,width-370,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
    cash.addImage("cashimage", cashImg);
    cash.scale = 0.12;
    cash.velocityY = 5;
    cash.lifetime = 350;
    cashG.add(cash);
  }
}

function createCoin(){
  if(World.frameCount % 320 == 0){
    var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
    coin.addImage("coinimage", coinimg);
    coin.scale = 0.6;
    coin.velocityY = 5;
    coin.lifetime = 350;
    coinG.add(coin);
  }
}

function createDiamonds() {
  if (World.frameCount % 410 == 0) {
    var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamonds.addImage("diamondsimage", diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 5;
    diamonds.lifetime = 350;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 670 == 0) {
    var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
    jwellery.addImage("jwellimage", jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 5;
    jwellery.lifetime = 350;
    jwelleryG.add(jwellery);
  }
}

function createIphone(){
  if (World.frameCount % 780 == 0) {
    var iphone = createSprite(Math.round(random(50, width-50),40, 10, 10));
    iphone.addImage("iphoneimage", iphoneImg);
    iphone.scale = 0.1;
    iphone.velocityY = 6;
    iphone.lifetime = 350;
    iphoneG.add(iphone);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
    sword.addImage("swordimage", swordImg);
    sword.scale=0.1;
    sword.velocityY = 4;
    sword.lifetime = 350;
    swordGroup.add(sword);
  }
}

function createBomb(){
  if (World.frameCount % 250 == 0) {
    var bomb = createSprite(Math.round(random(50, width-50),40, 10, 10));
    bomb.addImage("bombimage", bombImg);
    bomb.scale=0.1;
    bomb.velocityY = 4.5;
    bomb.lifetime = 350;
    bombG.add(bomb);
  }
}

function reset(){
  gameState = PLAY;
  boy.x = width/2;
  boy.y = height;
  boy.changeAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  if(treasureCollection>hightreasureCollection){
    hightreasureCollection = treasureCollection;
  }
  treasureCollection = 0;

  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  bombG.destroyEach();
  iphoneG.destroyEach();
}
