let objX;
let objY;

function drawHand() {

  camOn = true;
  const hands = handsfree.data?.hands;


  fill(0);
  noStroke();

  if (handsfree.data.hands) {
    if (handsfree.data.hands.multiHandLandmarks) {
      var landmarks = handsfree.data.hands.multiHandLandmarks;
      var nHands = landmarks.length;

      for (var h = 0; h < nHands; h++) {
        for (var i = 0; i <= 20; i++) {
          var px = landmarks[h][i].x;
          var py = landmarks[h][i].y;

          px = map(px, 0, 1, width, 0);
          py = map(py, 0, 1, 0, height);

          if (h == 0 && i == 4)
          {
            leftThumbX = px;
            leftThumbY = py;
          } else if (h == 0 && i == 8)
          {
            leftIndexX = px;
            leftIndexY = py;
          }



          //textFont(mainFont);
          //textSize(20);
          //fill(0);
          //text(i, px, py-50);
          fill('#FFA500');
          circle(px, py, 10);
        }
      }
    }
  } else
  {
    push();
    textSize(24);
    textAlign(CENTER);
    text("We are preparing now...Wait a sec", 500, 600);
    pop();
    camOn = false;
  }
  if (stage == 1)
  {
    if (roadNum <3)
    {
      //fill(60);
      //textSize(24);
      //textFont(mainFont);
      //text("Remain Roads : " + (3-roadNum), 600, 150);
      if (hands?.pinchState && hands.pinchState[0][0] === 'held')
      {
        noFill();
        stroke(3);
        rect(leftIndexX, leftIndexY, 400, 100);
        console.log("Touch!");
      } else if (hands?.pinchState && hands.pinchState[0][0] === 'released' && hands.pinchState[0][1] === 'released')
      {
        objX = width -  handsfree.data.hands.curPinch[0][0].x * width;
        objY =handsfree.data.hands.curPinch[0][0].y * height;



        var road = new Road(objX, objY, 400, 100);
        roads.push(road);
        roadNum ++;
      } 
      //console.log(objX +" " +objY);
      console.log("Released!");
    } else if (roadNum >=3)
    {
    }

    //for (let i = 0; i < roadNum; i++)
    //{
    //  if (isMouseInside(roads[i].x, roads[i].y, roads[i].w, roads[i].h))
    //  {
    //    text("inside", 600, 500);
    //  } else
    //  {
    //    text("outside", 600, 550);
    //  }
    //}
  }
}
