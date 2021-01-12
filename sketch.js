const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
var girl, girlImg, boy, boyImg, bg2Img, ground1, bg2, bg1Img, bg1;
var highground1, coin1, key1, key1Img;
var highgroundsGroup, highgroundImg, dragonsGroup, dragon1, dImg; 
var coinImg;
var gameState = "LOGIN";
var text1, text2, text3, t1Img, t2Img, t3Img;
var world, engine;
var count=0;

function preload(){
	bg1Img = loadImage("bg1.png");
	bg2Img = loadImage("bg2.jpg");
	girlImg = loadAnimation("girl1.png", "girl2.png", "girl3.png", 
	"girl4.png", "girl5.png", "girl6.png", "girl7.png");
	boyImg = loadAnimation("boy1.png", "boy2.png", "boy3.png", 
	"boy4.png", "boy5.png", "boy6.png", "boy7.png");
	highgroundImg = loadImage("highground.png");
	dImg = loadAnimation("dragon1.png", "dragon2.png", "dragon3.png", 
	"dragon4.png");
	coinImg = loadAnimation("coin1.png", "coin2.png", "coin3.png", 
	"coin4.png", "coin5.png", "coin6.png", "coin7.png", 
	"coin8.png", "coin9.png", "coin10.png");
	t1Img = loadImage("Text1.png");
	t2Img = loadImage("Text2.png");
	t3Img = loadImage("Text3.png");
}
	function setup() 
	{
		createCanvas(1700, 800);
		rectMode(CENTER);
	
		engine = Engine.create();
		world = engine.world;
	
		//ground1=new ground(850,785,1700,30);
		ground1=createSprite(850,785,1700,30);
	    ground1.shapeColor="blue";
	
		bg2 = createSprite(1000, 400, 1700, 800);
		bg2.addImage("imgofbg", bg2Img);
		bg2.scale = 0.6;
	
		text1 = createSprite(850, 400, 10, 10);
		text1.addImage("t1", t1Img);
		text1.scale = 1.5;
	
		text2 = createSprite(850, 400, 10, 10);
		text2.addImage("t2", t2Img);
		text2.scale = 1.3;
	
		text3 = createSprite(850, 200, 10, 10);
		text3.addImage("t3", t3Img);
		text3.scale = 1;
		text3.visible = true;
	
		girl = createSprite(200,660,10,10);
		girl.addAnimation("gImg", girlImg);
		girl.scale = 0.8;
	
		boy = createSprite(200,660,10,10);
		boy.addAnimation("bImg", boyImg);
		boy.scale = 0.8;
		
		dragonsGroup = createGroup();
		highgroundsGroup = createGroup();
	}
	
	
	function draw() 
	{
	  Engine.update(engine);
	  background("white");
	  girl.collide(ground1);
      boy.collide(ground1)
	  if(gameState === "LOGIN")
	  {
		background(bg1Img);
		ground1.visible = false;
		bg2.visible = false;
		text1.visible = true;
		text2.visible = false;
		text3.visible = false;
		boy.visible = false;
		girl.visible = false;
	  }
	
	  if(keyDown("space") && gameState === "LOGIN"){
		text1.visible = false;
		text2.visible = true;
		text3.visible = false;
		bg2.visible = false;
		boy.visible = false;
		girl.visible = false;
		gameState = "STORY";
	  }
	
	  if(gameState === "STORY")
	  {
		background(bg1Img);
		ground1.visible = false;
		bg2.visible = false;
		boy.visible = false;
		girl.visible = false;
	  }
	
	  if(keyCode === 13 && gameState === "STORY")
	  {
		background(bg2Img);
		bg2.visible = true;
		ground1.visible = true;
		text1.visible = false;
		text2.visible = false;
		text3.visible = true;
		boy.visible = false;
		girl.visible = false;
		gameState = "START";
	  }
	
	  if(gameState === "START"){
	
	  if ((keyCode === 103 || keyCode === 71)  && count !==2 && count!==1) 
		{
			count=1;
			girl.visible = true;
			boy.visible = false;
			text3.visible = false;
			gameState = "PLAY";
		}
	
		else if ((keyCode === 98 || keyCode === 66)&& count!==1 && count!==2)
		{
			count=2;
			boy.visible = true;
			girl.visible = false;
			text3.visible = false;
			gameState = "PLAY";
		}
	}
	
		if(gameState === "PLAY"){
			
			bg2.velocityX = -5;
			if( bg2.x <-100)
			{
				bg2.x = 1800;
			}
			
		if(keyDown("UP_ARROW") && count===1)
		  {
			  girl.visible = true;
			  boy.visible = false;
			girl.velocityY=-5;
		  }
	
		  if(keyDown("UP_ARROW") && count===2)
		  {
			boy.visible = true;
			girl.visible = false;
			boy.velocityY=-5;
		}
	
		boy.velocityY = boy.velocityY + 0.5;
		girl.velocityY = girl.velocityY + 0.5;
		  
		}
	
		dragon();	
		highGround();
	
	  drawSprites();
	  ground1.display();
	}
	
	function highGround() {
		if (frameCount % 180 === 0 && gameState === "PLAY") {
		  highground1 = createSprite(2200,120,10,10);
		  highground1.y = Math.round(random(250,650));
		  highground1.addImage(highgroundImg);
		  highground1.velocityX = -6;
		  highground1.scale = 0.8;
		  
		  highground1.lifetime = 500;
	
		  if(isTouching(girl, highground1)){
			girl.visible = false;
		}
		
		  highgroundsGroup.add(highground1);
	
			coin1 = createSprite(highground1.x, highground1.y - 70, 50, 50);
			coin1.addAnimation("Imgofcoin", coinImg);
			coin1.velocityX = -6;
			coin1.scale = 0.3;
		}
	  }
	  
	function dragon(){
		if(frameCount % 350 === 0 && gameState === "PLAY"){
			dragon1 = createSprite(1750, Math.round(random(100,600)), 50, 50);
			dragon1.velocityX = -6;
			dragon1.addAnimation("dragonImg", dImg);
			dragon1.lifetime = 500;
			dragon1.scale = 1.4;
			dragonsGroup.add(dragon1);
			//dragon1.depth = bg2.depth;
			//dragon1.depth = dragon1.depth + 1;
		}
	}
	
	function isTouching(object1, object2)
	{
	  if(object1.x-object2.x < object1.width/2+object2.width/2 && 
		(object2.x-object1.x < object1.width/2+object2.width/2) && 
		(object1.y-object2.y < object1.height/2+object2.height/2) && 
		(object2.y-object1.y < object1.height/2+object2.height/2))
	  {
		return true;
	  }
	  else
	  {
		return false;
	  }
	}	//key1Img = loadImage("key.png");


/*function setup() {
	createCanvas(1700, 800);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	//ground1=new ground(850,785,1700,30);
	ground1=createSprite(850,785,1700,30);
	ground1.shapeColor="blue";
	
	
	

	bg2 = createSprite(1000, 400, 1700, 800);
	bg2.addImage("imgofbg", bg2Img);
	bg2.scale = 0.6;
	//ground1.depth=bg2.depth;
	//ground1.depth+=1;



	text1 = createSprite(850, 400, 10, 10);
	text1.addImage("t1", t1Img);
	text1.scale = 1.5;

	text2 = createSprite(850, 400, 10, 10);
	text2.addImage("t2", t2Img);
	text2.scale = 1.3;

	text3 = createSprite(850, 200, 10, 10);
	text3.addImage("t3", t3Img);
	text3.scale = 1;
	text3.visible = true;

	girl = createSprite(200,660,10,10);
	girl.addAnimation("gImg", girlImg);
	girl.scale = 0.8;
	ground1.depth=girl.depth;
	girl.depth+=1;
    girl.debug=true;

	boy = createSprite(200,660,10,10);
	boy.addAnimation("bImg", boyImg);
	boy.scale = 0.8;
	
	
	dragonsGroup = createGroup();
	highgroundsGroup = createGroup();
}


function draw() 
{
  Engine.update(engine);
  background("white");
  
  girl.collide(ground1);
  
	 
  
  boy.collide(ground1)
  
 // highgroundsGroup.collide(girl);
	
  if(gameState === "LOGIN"){
	background(bg1Img);
	ground1.visible = false;
	bg2.visible = false;
	text1.visible = true;
	text2.visible = false;
	text3.visible = false;
	boy.visible = false;
	girl.visible = false;
  }

  if(keyDown("space") && gameState === "LOGIN"){
	text1.visible = false;
	text2.visible = true;
	text3.visible = false;
	bg2.visible = false;
	boy.visible = false;
	girl.visible = false;
	gameState = "STORY";
  }

  if(gameState === "STORY"){
	background(bg1Img);
	ground1.visible = false;
	bg2.visible = false;
	boy.visible = false;
	girl.visible = false;
  }

  if(keyCode === 13 && gameState === "STORY"){
	background(bg2Img);
	bg2.visible = true;
	ground1.visible = true;
	text1.visible = false;
	text2.visible = false;
	text3.visible = true;
	boy.visible = false;
	girl.visible = false;
	gameState = "START";
  }

  if(gameState === "START"){

  if ((keyCode === 103 || keyCode === 71)  && count !==2 && count!==1) 
	{
		count=1;
		girl.visible = true;
		boy.visible = false;
		text3.visible = false;
		gameState = "PLAY";
	}

	else if ((keyCode === 98 || keyCode === 66)&& count!==1 && count!==2)
	{
		count=2;
		boy.visible = true;
		girl.visible = false;
		text3.visible = false;
		gameState = "PLAY";
	}
}

	if(gameState === "PLAY"){
		
		bg2.velocityX = -5;
		if( bg2.x <-100)
		{
			bg2.x = 1800;
		}
		if(ground1.x<-100)
		{
			ground1.x=1800;
		}
		
	if(keyDown("UP_ARROW") && count===1)
  	{
	  	girl.visible = true;
	  	boy.visible = false;
		girl.velocityY=-5;
  	}

  	if(keyDown("UP_ARROW") && count===2)
  	{
		boy.visible = true;
		girl.visible = false;
		boy.velocityY=-5;
	}

	boy.velocityY = boy.velocityY + 0.5;
	girl.velocityY = girl.velocityY + 0.5;
	  
	}
	
	
	
  drawSprites();
  dragon();	
  highGround();
  //highgroundsGroup.collide(girl);
  //ground1.display();
}

function highGround() {
	if (frameCount % 180 === 0 && gameState === "PLAY") {
	  highground1 = createSprite(2200,120,10,10);
	  highground1.y = Math.round(random(250,650));
	  highground1.addImage(highgroundImg);
	  highground1.velocityX = -6;
	  highground1.scale = 0.8;
	  
	  highground1.lifetime = 500;
	  highground1.debug=true;
	 

	  highground1.depth=girl.depth;
	  
	  highgroundsGroup.add(highground1);
	 
	  
	 
		coin1 = createSprite(highground1.x, highground1.y - 70, 50, 50);
		coin1.addAnimation("Imgofcoin", coinImg);
		coin1.velocityX = -6;
		coin1.scale = 0.3;
		if(girl.isTouching(coin1))
	  {
		  console.log("bye");
	  }

	}
  }
  
function dragon(){
	if(frameCount % 350 === 0 && gameState === "PLAY"){
		dragon1 = createSprite(1750, Math.round(random(100,600)), 50, 50);
		dragon1.velocityX = -6;
		dragon1.addAnimation("dragonImg", dImg);
		dragon1.lifetime = 500;
		dragon1.scale = 1.4;
		dragonsGroup.add(dragon1);
		//dragon1.depth = bg2.depth;
		//dragon1.depth = dragon1.depth + 1;
	}
}

function isTouching(object1, object2)
{
  if(object1.x-object2.x < object1.width/2+object2.width/2 && 
	(object2.x-object1.x < object1.width/2+object2.width/2) && 
	(object1.y-object2.y < object1.height/2+object2.height/2) && 
	(object2.y-object1.y < object1.height/2+object2.height/2))
  {
    return true;
  }
  else{
    return false;
  }
}*/