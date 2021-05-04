var dog, happyDog;
var database
var foodS,foodStock;
var inputButton,inputButton1;
var fedTime,lastFed;
var foodObj;
var addFoods;
var milkBottle;

function preload(){
  dogImg=loadImage("dogImg.png");
  happyDog1=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  dog=createSprite(400,250,50,50);
  dog.scale=0.25;
  dog.addImage(dogImg);

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj=new Food();
}


function draw() {  
  background(46, 139, 87);

  fedTime=database.ref('lastFed');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill("red");
  textSize(20);
  stroke(5);
  text("Food remaining: "+foodS,400,350);

  if(foodS==0){
    dog.addImage(dogImg);
    fill("black");
    stroke(5);
    text("Food is out of Stock, Please add it.",200,400);

  }

  drawSprites();
  foodObj.display();
  }
function readStock(data){
  foodS=data.val();
foodObj.updateFoodStock(foodS);
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
 
}

function addFoods(){
  foodS=foodS+1;
  foodObj.updateFoodStock();
  database.ref('/').update({
  Food:foodS
  })
}

function feedDog(){
  if(foodS>0){
    var h=hour();
    var m=minute();
    var s=second();
    var p=h+":"+m+":"+s
    foodS=foodS-1;
    foodObj.deductFood();
    database.ref('/').update({
      Food:foodS,
      lastFed:p
  })
    dog.addImage(happyDog1);
  }

}