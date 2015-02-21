function ResetGame(){
  for (var i = Bullets.length - 1; i >= 0; i++){
    Bullets.splice(i,1);
  }

  Player1.PosX = 40;
  Player1.PosY = 40;
  Player1.Speed = 0;
  Player1.Spin = -135;
  Player1.WaitToShoot = 0;
  Player1.HP = 100;

  Player2.PosX = 514;
  Player2.PosY = 514;
  Player2.Speed = 0;
  Player2.Spin = 45;
  Player2.WaitToShoot = 0;
  Player2.HP = 100;

  var _p1HP = document.getElementById("p1HP");
  _p1HP.style.height = (Player1.HP * 4)+"px";

  var _p2HP = document.getElementById("p2HP");
  _p2HP.style.height = (Player2.HP * 4)+"px";

  WinnerAdded = false;
  if (Scoreboard.length > 5){
    Scoreboard.splice(0,1);
  }
}

function PrintWinner(PlayerNum){
  var Winner = "";
  if (PlayerNum == 1) Winner = Player1.Name + " won!";
  else if (PlayerNum == 2) Winner = Player2.Name + " won!";
  else Winner = "Both players are dead";
  ctx.font = "bold 75px arial";
  ctx.textAlign="center";
  ctx.textBaseline="bottom";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(Winner,300,300);
  ctx.strokeText(Winner,300,300);
  ctx.font = "bold 35px arial";
  ctx.textAlign="center";
  ctx.textBaseline="top";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Press enter to play again",300,300);
  ctx.strokeText("Press enter to play again",300,300);
}

function ClearMap(){
  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,600,600);
  ctx.restore();
}

function DrawMap(){
  if (!ShouldFilterImage){
    var img = new Image();
    img.src = 'graphics/map_background.png';
    ctx.drawImage(img,0,0,600,600);
  }

  var obstacle1 = new Image();
  obstacle1.src = 'graphics/obstacle_vertical.png';
  ctx.drawImage(obstacle1,
                Obstacle1.Left,Obstacle1.Up,
                Obstacle1.Width,Obstacle1.Height);

  var obstacle2 = new Image();
  obstacle2.src = 'graphics/obstacle_vertical.png';
  ctx.drawImage(obstacle2,
                Obstacle2.Left,Obstacle2.Up,
                Obstacle2.Width,Obstacle2.Height);

  var obstacle3 = new Image();
  obstacle3.src = 'graphics/obstacle_horizontal.png';
  ctx.drawImage(obstacle3,
                Obstacle3.Left,Obstacle3.Up,
                Obstacle3.Width,Obstacle3.Height);

  var obstacle4 = new Image();
  obstacle4.src = 'graphics/obstacle_horizontal.png';
  ctx.drawImage(obstacle4,
                Obstacle4.Left,Obstacle4.Up,
                Obstacle4.Width,Obstacle4.Height);
}

function DrawPlayer1(){
  var player1 = new Image();
  player1.src = 'graphics/swe_char.png';
  ctx.drawImage(player1,Player1.PosX,Player1.PosY);
}

function DrawPlayer2(){
  var player2 = new Image();
  player2.src = 'graphics/usa_char.png';
  ctx.drawImage(player2,Player2.PosX,Player2.PosY);
}

function DrawTombstone(X, Y){
  var tombstone = new Image();
  tombstone.src = 'graphics/tombstone.png';
  ctx.drawImage(tombstone,X,Y);
}

function Bullet(){
  if (Bullets.length > 0){
    for (var i = 0; i < Bullets.length; i++){
      var Shot = new Image();
      Shot.src = 'graphics/bullet.png';

      Bullets[i].PosX += BulletSpeed * Math.cos(Bullets[i].Dir);
      Bullets[i].PosY += BulletSpeed * Math.sin(Bullets[i].Dir);

      ctx.drawImage(Shot,Bullets[i].PosX,Bullets[i].PosY,4,6);
    }
  }
}

function CheckBounds(){
  if (Player2.PosX < 0) Player2.PosX = 0;
  else if (Player2.PosX > 554) Player2.PosX = 554;

  if (Player2.PosY < 0) Player2.PosY = 0;
  else if (Player2.PosY > 554) Player2.PosY = 554;

  if (Player1.PosX < 0) Player1.PosX = 0;
  else if (Player1.PosX > 554) Player1.PosX = 554;

  if (Player1.PosY < 0) Player1.PosY = 0;
  else if (Player1.PosY > 554) Player1.PosY = 554;

  for (var i = Bullets.length-1; i >= 0; --i){
    if (Bullets[i].PosX < 0){
      Bullets[i].Remove = true;
    }
    else if (Bullets[i].PosX > 596){
      Bullets[i].Remove = true;
    }
    if (Bullets[i].PosY < 0) {
      Bullets[i].Remove = true;
    }
    else if (Bullets[i].PosY > 594) {
      Bullets[i].Remove = true;
    }
  }
}

function PlayersCollide(){
  if(Player1.PosX < Player2.PosX + 23 &&
     Player1.PosX + 23 > Player2.PosX &&
     Player1.PosY < Player2.PosY + 23 &&
     Player1.PosY + 23 > Player2.PosY)
  {
    if (Player1.PosX < Player2.PosX)
    {
      Player1.PosX -=7;
      Player2.PosX +=7;
    }
    else if(Player1.PosX > Player2.PosX)
    {
      Player1.PosX +=7;
      Player2.PosX -=7;
    }
    if (Player1.PosY < Player2.PosY)
    {
      Player1.PosY-=7;
      Player2.PosY+=7;
    }
    else if(Player1.PosY > Player2.PosY)
    {
      Player1.PosY+=7;
      Player2.PosY-=7;
    }
  }
}

function TriggerAnimP1(){
  var Healthbar = document.getElementsByClassName("hitanim")[0];
  Healthbar.classList.add('anim');
  setTimeout(StopAnimP1, 500);
}

function StopAnimP1(){
  var Healthbar = document.getElementsByClassName("hitanim")[0];
  Healthbar.classList.remove('anim');
  Healthbar.style.height = (Player1.HP * 4)+"px";
}

function TriggerAnimP2(){
  var Healthbar = document.getElementsByClassName("hitanim")[1];
  Healthbar.classList.add('anim');
  setTimeout(StopAnimP2, 500);
}

function StopAnimP2(){
  var Healthbar = document.getElementsByClassName("hitanim")[1];
  Healthbar.classList.remove('anim');
  Healthbar.style.height = (Player2.HP * 4)+"px";
}

function PlayerCollideWBullet(){
  for (var i = 0; i < Bullets.length; i++){
    if (Bullets[i].Shooter == 1){
      if(Player2.PosX < Bullets[i].PosX + 4 &&
         Player2.PosX + 46 > Bullets[i].PosX &&
         Player2.PosY < Bullets[i].PosY + 4 &&
         Player2.PosY + 46 > Bullets[i].PosY)
      {
        Player2.HP -= 10;

        TriggerAnimP2();

        Bullets[i].Remove = true;
        PlayerTwoHurt();
      }
    }
    else if (Bullets[i].Shooter == 2){
      if(Player1.PosX < Bullets[i].PosX + 4 &&
         Player1.PosX + 46 > Bullets[i].PosX &&
         Player1.PosY < Bullets[i].PosY + 4 &&
         Player1.PosY + 46 > Bullets[i].PosY)
      {
        Player1.HP -= 10;

        TriggerAnimP1();

        Bullets[i].Remove = true;
        PlayerOneHurt();
      }
    }
  }
}

function PlayersCollideWBarrier(){
  for (var i = 0; i < Players.length; i++){
    for (var j = 0; j < 2; j++){
      if (Players[i].PosX < Obstacles[j].Right &&
          Players[i].PosX + 40 > Obstacles[j].Left &&
          Players[i].PosY < Obstacles[j].Down &&
          Players[i].PosY + 40 > Obstacles[j].Up)
      {
        if (Players[i].PosX < Obstacles[j].Left)
        {
           Players[i].PosX-=7;
        }
        else if (Players[i].PosX > Obstacles[j].Left)
        {
          Players[i].PosX +=7;
        }
        else if (Players[i].PosY < Obstacles[j].Up)
        {
          Players[i].PosY-=7;
        }
        else if (Players[i].PosY > Obstacles[j].Up)
        {
          Players[i].PosY+=7;
        }
      }
    }
    for (var k = 2; k < 4; k++){
      if (Players[i].PosX < Obstacles[k].Right &&
          Players[i].PosX + 40 > Obstacles[k].Left &&
          Players[i].PosY < Obstacles[k].Down &&
          Players[i].PosY + 40 > Obstacles[k].Up)
      {
        if (Players[i].PosY < Obstacles[k].Up)
        {
          Players[i].PosY-=7;
        }
        else if (Players[i].PosY > Obstacles[k].Up)
        {
          Players[i].PosY+=7;
        }
        else if (Players[i].PosX < Obstacles[k].Left)
        {
           Players[i].PosX-=7;
        }
        else if (Players[i].PosX > Obstacles[k].Left)
        {
          Players[i].PosX +=7;
        }
      }
    }
  }
}

function BulletCollideWBarrier(){
  for (var i = 0; i < Bullets.length; i++){
    for (var j = 0; j < Obstacles.length; j++){
      if(Obstacles[j].Left < Bullets[i].PosX + 4 &&
         Obstacles[j].Right > Bullets[i].PosX &&
         Obstacles[j].Up < Bullets[i].PosY + 4 &&
         Obstacles[j].Down > Bullets[i].PosY)
      {
        Bullets[i].Remove = true;
        break;
      }
    }
  }
}

function RemoveBullets(){
  for (var i = Bullets.length-1; i >= 0; i--){
    if (Bullets[i].Remove){
      Bullets.splice(i,1);
    }
  }
}

function CheckWinner(){
  if (Player1.HP < 1 && Player2.HP < 1)
  {
    PrintWinner(0);
    if (!WinnerAdded){
      Scoreboard[Scoreboard.length] = "Oavgjort";
      WinnerAdded = true;
    }
  }
  else if (Player1.HP < 1)
  {
    PrintWinner(2);
    if (!WinnerAdded){
      Scoreboard[Scoreboard.length] = Player2.Name;
      WinnerAdded = true;
    }
  }
  else if (Player2.HP < 1)
  {
    PrintWinner(1);
    if (!WinnerAdded){
      Scoreboard[Scoreboard.length] = Player1.Name;
      WinnerAdded = true;
    }
  }
}

function FilterPlayer1(X, Y){
  var ImageData = ctx.getImageData(X,Y,46,46);

  var PixelArray = ImageData.data;
  for (var i = 0; i < PixelArray.length; i += 4){
    if (ShouldFilterImage){
      PixelArray[i] = 255;
      PixelArray[i+1] = PixelArray[i+2] = 0;
    }
    if (Player1.HP < 100){
      if (PixelArray[i+3] > 50){
        PixelArray[i+3] = 255 - (100-Player1.HP);
      }
    }
  }
  ctx.putImageData(ImageData,X,Y);
}

function FilterPlayer2(X, Y){
  var ImageData = ctx.getImageData(X,Y,46,46);

  var PixelArray = ImageData.data;
  for (var i = 0; i < PixelArray.length; i += 4){
    if (ShouldFilterImage){
      PixelArray[i] = PixelArray[i+1] = 0;
      PixelArray[i+2] = 255;
    }
    if (Player2.HP < 100){
      if (PixelArray[i+3] > 50){
        PixelArray[i+3] = 255 - (100-Player2.HP);
      }
    }
  }
  ctx.putImageData(ImageData,X,Y);
}
