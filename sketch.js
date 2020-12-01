//Declaration of sprite variables
var bullet,wall;
var thickness;
var speed,weight;
var deformation;
var rejectedWalls;
var restart, restart_img;
var Wallschecked;
var PLAY=1;
var END=0;
var gameState=PLAY;


function setup() {
  //To create canvas
  createCanvas(1600,400);
  
  //Car sprite
  bullet=createSprite(40,200,80,15);
  bullet.shapeColor="white";

  //Randomizing thickness of wall
  thickness=Math.round(random(22,83));

  //Wall sprite
  wall=createSprite(1200,200,thickness,height/2);
  wall.shapeColor=color(80,80,80);

  //Randomizing speed and weight of car
  speed=Math.round(random(223,321));
  weight=Math.round(random(30,52));

  //To make car velocity value as speed
  bullet.velocityX=speed;
  
  //Assigning value of deformation
  damage=0.5*weight*speed*speed/(thickness*thickness*thickness);
  
  //Restart sprite
  restart=createSprite(800,200,70,30);
  

  //initial value of rejected cars;
  rejectedWalls=0;

  //intial value of carschecked
  Wallschecked=1;

}

function draw() {
  //To assign the background
  background(0);  

  if(gameState===PLAY)
  {

   
  
   restart.visible=false;

   if(hasCollided(bullet,wall))
   {
     bullet.velocityX=0;

     if(damage>10)
     {
       wall.shapeColor=color(255,0,0);
      gameState=END;
      rejectedWalls=rejectedWalls+1;
     }

     if(damage<10)
     {
       wall.shapeColor=color(0,255,0);
       gameState=END;
     }
   }

  } else if(gameState===END)
  {
    restart.visible=true;
    if(mousePressedOver(restart))
    {
     reset();
     gameState=PLAY;
    }
  }

  
  
  //To draw the sprites
  drawSprites()

  fill("white");
  strokeWeight(0);
  stroke("yellow");
  textSize(18);
  text("Rejected Walls: "+rejectedWalls,100,40);
  text("Walls Tested: "+Wallschecked,1400,40);
}

function reset()
{
  bullet.shapeColor="white";
  bullet.x=40;
  bullet.velocityX=speed;
  Wallschecked=Wallschecked+1;
  gameState=PLAY;
}