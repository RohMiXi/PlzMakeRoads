let stage = 0;
let titleSize = 90;
let headerSize = 72;
let mouseClick = false;
let backgroundFX = [];
let frameNum = 0;

let mousePlayOn = false;
let mouseTutoOn = false;
let mouseTutoClose = false;

let tutoPopup = false;

let camOn = false;

let markNum = 0;

let leftIndexX ;
let leftIndexY ;
let leftThumbX ;
let leftThumbY ;


let soundFlag = 1;

let collideDetection = 0;


let roads = [];


let mainBgmOn = true;
;
let selectSoundOn = false;
let deadSoundOn = false;
let winSoundOn = false;

function preload() {
  titleFont = loadFont("data/fonts/SpecifyPERSONAL-ExExpBlack.ttf");
  mainFont = loadFont("data/fonts/SUIT/SUIT-Medium.ttf");
  menuFont = loadFont("data/fonts/SpecifyPERSONAL-ExExpBold.ttf");
  cursor_normal = loadImage("data/images/cursor/mouse_base1.png");
  cursor_click = loadImage("data/images/cursor/mouse_action1.png");
  tutorialImage = loadImage("data/images/tutorial/tutorial.png");
  buildings = loadImage("data/images/gameBackground.png");
  overBack = loadImage("data/images/deadBack.png");
  winBack = loadImage("data/images/winBack.png");


  soundFormats('mp3', 'ogg');

  mainBgm = loadSound('data/sound/BGM.mp3');
  selectSound = loadSound("data/sound/select.mp3");
  deadSound = loadSound("data/sound/dead.wav");
  winSound = loadSound("data/sound/win.wav");
}
//------------------------------------------
function setup() {

  let main = createCanvas(1200, 800);
  main.parent("item");
  handsfree = new Handsfree( {
  showDebug:
    false, // true - webcam on
    hands:
    true,
    maxNumHands:
    2
  }
  )

  //handsfree.enablePlugins('core');
  for (let i=0; i < 119; i++) {
    backgroundFX[i] = loadImage("data/images/background_sequence/background" + i + ".png");
  }

  noCursor();

  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();

  handsfree.start();
}

// draw ----------------------------------

function draw() {


  console.log("mouseX :" + mouseX + "mouseY :" + mouseY);
  if (stage == 0)
  {
    MainPage();
  } else if (stage == 1)
  {
    stage1();
  } else if (stage == 2)
  {
    gameClear();
  } else if (stage == 3)
  {
    gameOver();
  }
  drawHand();


  if (mouseClick == true)
  {
    image(cursor_click, mouseX-10, mouseY-10);
  } else
  {
    image(cursor_normal, mouseX, mouseY);
  }

  console.log(roadNum);
}

//----------------------------------------

// MOUSE CURSOR ==========================


function mousePressed()
{
  mouseClick = true;
}

function mouseReleased()
{
  mouseClick = false;
}

//----------------------------------------

let st1Start = false;

function stage1()
{
  background(220);
  if (st1Start == false)
  {
    stage1Ready();
  } else {
    stage1Start();
  }
}


let roadNum = 0;
let clearOn = false;

function stage1Ready()
{

  background(buildings);

  fill(50, 50, 50);
  rectMode(CENTER);
  rect(75, 400, 150, 400);
  rect(1125, 400, 150, 400);
  rectMode(CORNER);

  fill(20, 20, 20);
  textSize(24);
  textFont(titleFont);
  textAlign(CENTER);
  text("Make Road Then Click START Button", 600, 100);
  //collideDetection = 0;

  for (let i = 0; i< roads.length; i++)
  {
    roads[i].display();
    roads[i].isMouseInside(roads[i].x, roads[i].y, roads[i].w, roads[i].h);
    collideDetection += roads[i].flag;
  }



  if (roadNum < 3)
  {
    fill(60);
    textSize(24);
    textFont(mainFont);
    text("Remain Roads : " + (3-roadNum), 600, 150);
  } else if (roadNum >= 3)
  {
    fill(140, 20, 30);
    textSize(24);
    textFont(mainFont);
    text("All Roads Are Used!", 600, 150);
  }

  fill(120, 14, 231);
  circle(80, 400, 50);

  fill(250);
  textSize(12);
  textFont(mainFont);
  text("START", 80, 405);

  if (roadNum >= 1)
  {
    fill('rgb(200, 20, 80)');

    if (mouseX > 440 && mouseX < 750 && mouseY > 670 && mouseY < 700)
    {
      clearOn = true;
      fill('rbg(240, 200, 240)');
    } else
    {
      clearOn = false;
    }

    textSize(32);
    textAlign(CENTER);
    textFont(titleFont);
    text("Clear Roads", 600, 700);
  }


  if (dist(80, 400, mouseX, mouseY) <= 50)
  {
    st1Start = true;
  }
}



let onSafe = 0;
let gameOverStatus = false;




function stage1Start()
{
  background(buildings);

  fill(50, 50, 50);
  rectMode(CENTER);
  rect(75, 400, 150, 400);
  rect(1125, 400, 150, 400);
  rectMode(CORNER);


  fill(230, 230, 20);
  circle(1120, 400, 50);

  fill('rbg(10, 40, 180)');
  textSize(12);
  textFont(mainFont);
  text("GOAL", 1120, 405);


  collideDetection = 0;

  if (mouseX > 0 && mouseX < 150 && mouseY > 200 && mouseY < 600)
  {
    onSafe = 1;
  } else if (mouseX > 1050 && mouseX < 1200 && mouseY > 200 && mouseY < 600)
  {
    onSafe = 1;
  } else
  {
    onSafe = 0;
  }

  for (let i = 0; i< roads.length; i++)
  {
    roads[i].display();
    roads[i].isMouseInside(roads[i].x, roads[i].y, roads[i].w, roads[i].h);
    collideDetection += roads[i].flag;
  }

  movingHazard();

  if (collideDetection + onSafe <= 0)
  {
    deadSoundOn = true;
    mainBgmOn = false;
    stage = 3;
  }

  if (dist(1120, 400, mouseX, mouseY) <= 50)
  {
    winSoundOn = true;
    mainBgmOn = false;
    stage = 2;
  }


  console.log(movingHazard());
}

let xPos = 600;
let yPos = 50;
let speed = 5;

function movingHazard()
{
  fill('rgb(200,20,60)');
  circle(xPos, yPos, 100);
  yPos += speed;

  if (yPos >= 750 || yPos < 50 )
  {
    speed = -speed;
  }
  console.log("run");

  if (dist(xPos, yPos, mouseX, mouseY) <= 80)
  {
    console.log("collision!!");
    onSafe = -1;
  }
}

//----------- ROAD CLASS ------------------

class Road
{
  constructor (tempX, tempY, tempW, tempH) {
    this.x = tempX;
    this.y = tempY;
    this.w = tempW;
    this.h = tempH;
    this.flag = 0;
  }
  display() {
    noStroke();
    fill('#323232');
    rect(this.x, this.y, this.w, this.h);
  }

  isMouseInside(x, y, w, h) {
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y+h) {
      this.flag = 1;
    } else {
      this.flag = 0;
    }
  }

  collideDetect(flag) {
    if (flag == 1)
    {
      fill(255);
      textAlign(CENTER);
      text("inside", this.x + 150, this.y + 50);
    } else if (flag == 0)
    {
      fill(255);
      textAlign(CENTER);
      text("outside", this.x + 150, this.y + 50);
    }
  }
}


//-----------------------------------

function gameClear()
{
  if (winSoundOn == true)
  {
    winSound.play();
    console.log("sibak");
    mainBgm.stop();
    winSoundOn = false;
  }
  
  background(winBack);

  fill(0);
  textSize(90);
  textFont(titleFont);
  textAlign(CENTER);
  text("BETA is over", 600, 300);
  textSize(32);
  textFont(mainFont);
  text("Thanks you for playing :)", 600, 360);
}


let mouseRetryOn = false;
let btnCol = 200;


function gameOver()
{
  if (deadSoundOn == true)
  {
    deadSound.play();
    console.log("sibak");
    mainBgm.stop();
    deadSoundOn = false;
  }



  background(overBack);

  fill(255);
  textSize(60);
  textFont(titleFont);
  textAlign(CENTER);
  text("Cursorman Dead", 600, 300);
  textSize(24);
  textFont(mainFont);
  text("He fell from the roof of a building...", 600, 400);

  push();
  rectMode(CENTER);
  fill(btnCol);
  rect(600, 500, 300, 70, 10);
  pop();



  if (mouseX > 450 && mouseY > 460 && mouseX < 750 && mouseY < 540) {
    mouseRetryOn = true;
    btnCol = 230;
    fill('#34B3F1');
  } else {
    mouseRetryOn = false;
    btnCol = 200;
  }
  textFont(titleFont);
  textSize(24);
  text("Retry", 600, 510);
}
