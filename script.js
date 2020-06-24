let canvas = document.querySelector('#myCanvas');

let ctx = canvas.getContext('2d');


setInterval(draw ,10 );
 let x = canvas.width/2;
 let y = canvas.height-30;
 let dx = 2 ;
 let dy = -2 ;
 let ballRadius = 20;
 let paddleHeight =10;
 let paddleWidth = 75;
 let paddleX = (canvas.width - paddleWidth)/2;
 let rightPressed = false ;
 let leftPressed = false;
 let brickRowCount = 3;
 let brickColumnCount = 5;
 let brickWidth = 75 ;
 let brickHeight = 20 ;
 let brickPadding = 5;
 let brickOffSetTop = 30;
 let brickOffSetLeft = 30;

 var bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = {x:0 , y:0 ,status:1 }                
            }      
  }


 document.addEventListener("keydown", keyDownHandler);
 document.addEventListener("keyup", keyUpHandler);

 function keyDownHandler(e){
     if(e.keyCode == 39){
         rightPressed = true;
     }else if(e.keyCode == 37){
         leftPressed = true;
     }
         
 }
 function keyUpHandler(e){
     if(e.keyCode == 39){
         rightPressed = false;
     }else if(e.keyCode == 37){
         leftPressed = false;
     }
         
 }


 function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function collisionDetection() {
      for (let c = 0; c <brickColumnCount; c++) {          
        for (let r = 0; r <brickRowCount; r++) {
           
            var b = bricks[c][r];
            if(b.status == 1){
                if(x> b.x && x > b.x+brickWidth && y > b.y&& y < b.y+brickHeight){
                    dy  = -dy;
                    b.status = 0;
                    
                }          
            }
      }
      
  }
}
  function drawPaddle(){
    ctx.beginPath(); 
    ctx.rect(paddleX, canvas.height - paddleHeight , paddleWidth ,paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath(); 
  }

  function drawBricks(){
      for (let c = 0; c < brickColumnCount; c++) {
          
        for (let r = 0; r <brickRowCount; r++) {
            if(bricks[c][r].status == 1){
                let brickX = ( c * (brickWidth + brickPadding)) + brickOffSetLeft;
                let brickY = ( r * (brickWidth + brickPadding)) + brickOffSetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
         
      }

          
      }
  }

 function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
   

    x +=dx;
    y +=dy; 
    
    if(y + dy < 0 + ballRadius  ){
        dy = -dy;
    }else if (y + dy > canvas.height -ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        }else {
            
        alert("game Over");
        document.location.reload();
        }
    }


    if(x + dx < 0 + ballRadius  || x + dx > canvas.width - ballRadius ){
        dx = -dx;
    }
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX +=7;

    }else if(leftPressed && paddleX > 0 ){
        paddleX -=7;
    }
     
 }


 
  