function MainPage()
{
  if (mainBgmOn == true)
  {
    mainBgm.play();
    console.log("sibak");

    mainBgmOn = false;
  }

  background(240);
  backFX();

  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER);
  fill(0);
  text("PLZ MAKE ROAD", 600, 300);
  strokeWeight(1);
  stroke('rgba(0,0,0,0.4)');
  noFill();
  text("PLZ MAKE ROAD", 600, 330);
  text("PLZ MAKE ROAD", 600, 270);


  //buttons
  if (camOn == true)
  {
    startBtn();
    tutoBtn();
  }

  //tutorial Popup
  if (tutoPopup == true)
  {
    tutorial();
  }
}

function tutorial()
{
  background('rgba(0,0,0,0.7)');
  rectMode(RADIUS);
  noStroke();
  fill(255, 255, 255);
  rect(600, 400, 500, 300, 15);
  textFont(titleFont);
  textSize(headerSize);
  fill(0, 0, 0);
  textAlign(CENTER);
  text("HOW TO PLAY", 600, 200);
  textSize(24);
  textFont(mainFont);
  text("Pinch your fingers to make a road for the Cursor man ", 600, 550);
  text("who wants to go over to the opposite.", 600, 582);
  image(tutorialImage, 380, 200);
  tutoCloseBtn();
}


function backFX()
{
  image(backgroundFX[frameNum], 0, 0);
  frameNum++;
  if (frameNum >= 119)
  {
    frameNum = 0;
  }
}

function startBtn()
{
  textFont(menuFont);
  textSize(40);
  textAlign(CENTER);
  if (mouseX > 240 && mouseY > 465 && mouseX < 470 && mouseY < 500) {
    mousePlayOn = true;
    fill('#34B3F1');
  } else {
    mousePlayOn = false;
    fill(0);
  }
  text("START", 350, 500);
}

function tutoBtn()
{
  textFont(menuFont);
  textSize(40);
  textAlign(CENTER);
  if (mouseX > 570 && mouseY > 465 && mouseX < 1040 && mouseY < 500) {
    mouseTutoOn = true;
    fill('#34B3F1');
  } else {
    mouseTutoOn = false;
    fill(0);
  }
  text("HOW TO PLAY", 800, 500);
}

function tutoCloseBtn()
{
  textFont(menuFont);
  textSize(32);
  textAlign(CENTER);
  if (mouseX > 510 && mouseY > 630 && mouseX < 680 && mouseY < 660) {
    mouseTutoClose = true;
    fill('#34B3F1');
  } else {
    mouseTutoClose = false;
    fill(0);
  }
  text("CLOSE", 600, 660);
}



function mouseClicked()
{
  if (mousePlayOn == true || mouseTutoOn == true || mouseRetryOn == true || clearOn == true)
  {
    if (mouseX > 240 && mouseY > 465 && mouseX < 470 && mouseY < 500)
    {
      stage = 1;
    } else if (mouseX > 570 && mouseY > 465 && mouseX < 1040 && mouseY < 500)
    {
      tutoPopup = true;
    } else if (mouseX > 450 && mouseY > 460 && mouseX < 750 && mouseY < 540)
    {
      stage = 1;
      st1Start = false;
      roadNum = 0;
      roads.splice(0, roads.length);
      mainBgm.play();
    } else if (mouseX > 440 && mouseX < 750 && mouseY > 670 && mouseY < 700)
    {
      roadNum = 0;
      roads.splice(0, roads.length);
    }
  }

  if (mouseTutoClose == true)
  {
    tutoPopup = false;
    mouseTutoClose = false;
  }
}





function blurSystem()
{
  if (tutoPopup == true)
  {
    drawingContext.filter = 'blur(20px)';
  } else
  {
    drawingContext.filter = 'blur(0px)';
  }
}
