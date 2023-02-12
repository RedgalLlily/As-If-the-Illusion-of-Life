let canvas;
let button;

let food = 0;
let feeding = false;

let hungry = 0;
let full = 1;
let tamaState = hungry;

let tamaX;
let tamaY;
let tamaDiam;

function setup() {
  console.log(windowWidth);
  if(windowWidth < 600){
    canvas = createCanvas(windowWidth, windowWidth);
  }else{
  canvas = createCanvas(500, 500);
  }
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;

  addGUI();
}

function draw() {
  background(200,200,250);
  
  //Drawing
  noStroke();

  //manage state of Tama
  if(tamaState == hungry){
    fill(200,30,50);
    circle(tamaX-80,tamaY-100,tamaDiam/2);
    circle(tamaX+80,tamaY-100,tamaDiam/2);

    //manage switching to full state
    if(tamaDiam > width/4){
      tamaState = full;
    }

  }else if(tamaState == full){
    //full color
    stroke(0,255,0);
    strokeWeight(5);
    noFill();
    arc(tamaX-80,tamaY-100,tamaDiam/2,tamaDiam/4,PI,0);
    arc(tamaX+80,tamaY-100,tamaDiam/2,tamaDiam/4,PI,0);
    fill(0,255,0);

    //manage returning to hungry state
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState = hungry;
    }
  }

  //draw Tama and closed mouth
  rectMode(CENTER);
  rect(tamaX,tamaY,tamaDiam);
  fill(0);
  let mouthOffset = tamaDiam/2;
  rect(tamaX,tamaY,mouthOffset*2,3);


  if(food > 0 ){

    //Tama Eat
    if(frameCount % 30 < 15 && tamaState == hungry){
      eatFood();
    }

    //draw food
    fill(100);
    circle(tamaX,tamaY+food,food);

  }else if(feeding){
    //manage button state, only do this once IF the button is inactive
    feeding = false;
    button.html("FEED");
    button.removeClass("inactive");
  }
  

}

function eatFood(){

  //draw open mouth
  fill(0);
  rectMode(CENTER);
  rect(tamaX,tamaY,tamaDiam);

  //reduce food & grow Tama
  food --;
  tamaDiam++;

}

function addGUI()
{

  //add a button
  button = createButton("FEED");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
    if(!feeding){
      //set food to random value
      food = random(40,60);
      feeding = true;

      //manage button state
      button.html("FEEDING");
      button.addClass("inactive");
    }
    
}

