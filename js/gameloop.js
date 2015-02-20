ResetGame();
setInterval(renderfunc, 33);

function renderfunc(){
  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,600,600);
  ctx.restore();

  if (!ShouldFilterImage){
    var img = new Image();
    img.src = 'graphics/map_background.png';
    ctx.drawImage(img,0,0,600,600);
  }

  window.addEventListener("keydown", function(event){
    if (event.defaultPrevented){
      return;
    }

    switch(event.keyCode){
      case 13:
        if (Player1.HP < 1 || Player2.HP < 1){
          ResetGame();
        }
        break;
      case 37:
        Player2.Left = true;
        break;
      case 39:
        Player2.Right = true;
        break;
      case 38:
        Player2.Up = true;
        break;
      case 40:
        Player2.Down = true;
        break;
      case 190:
        if (!Player2.IsShooting && Player2.HP > 0){
          Player2.IsShooting = true;
        }
        break;
      case 87:
        Player1.Up = true;
        break;
      case 65:
        Player1.Left = true;
        break;
      case 83:
        Player1.Down = true;
        break;
      case 68:
        Player1.Right = true;
        break;
      case 81:
        if (!Player1.IsShooting && Player1.HP > 0){
          Player1.IsShooting = true;
        }
        break;
      default:
        return;
    }
  }, true);

  window.addEventListener("keyup", function(event){
    if (event.defaultPrevented){
      return;
    }

    switch(event.keyCode){
      case 37:
        Player2.Left = false;
        break;
      case 39:
        Player2.Right = false;
        break;
      case 38:
        Player2.Up = false;
        break;
      case 40:
        Player2.Down = false;
        break;
      case 190:
        Player2.IsShooting = false;
        break;
      case 87:
        Player1.Up = false;
        break;
      case 65:
        Player1.Left = false;
        break;
      case 83:
        Player1.Down = false;
        break;
      case 68:
        Player1.Right = false;
        break;
      case 81:
          Player1.IsShooting = false;
        break;
      default:
        return;
    }
  }, true);

  if (Player1.Left) Player1.Spin -= 7;
  if (Player1.Right) Player1.Spin += 7;
  if (Player1.Up) Player1.Speed += 7;
  if (Player1.Down) Player1.Speed -= 7;

  if (Player2.Left) Player2.Spin -= 7;
  if (Player2.Right) Player2.Spin += 7;
  if (Player2.Up) Player2.Speed += 7;
  if (Player2.Down) Player2.Speed -= 7;

  if (Player1.Spin >= 360) Player1.Spin -= 360;
  if (Player2.Spin >= 360) Player2.Spin -= 360;

  var Rad1 = Player1.Spin*Math.PI/180;
  var Rad2 = Player2.Spin*Math.PI/180;

  if (Player1.IsShooting) {
    if (Player1.WaitToShoot == 0){
      Bullets[Bullets.length] = {"PosX" : Player1.PosX+23,
                                 "PosY" : Player1.PosY+23,
                                 "Dir" : Rad1,
                                 "Shooter" : 1,
                                 "Remove" : false};
      Player1.WaitToShoot = 15;
      PlayerOneShoot();
    }
  }
  if (Player2.IsShooting) {
    if (Player2.WaitToShoot == 0){
      Bullets[Bullets.length] = {"PosX" : Player2.PosX+23,
                                 "PosY" : Player2.PosY+23,
                                 "Dir" : Rad2,
                                 "Shooter" : 2,
                                 "Remove" : false};
      Player2.WaitToShoot = 15;
      PlayerTwoShoot();
    }
  }
  Bullet();

  if (Player1.WaitToShoot != 0){
    Player1.WaitToShoot--;
  }
  if (Player2.WaitToShoot != 0){
    Player2.WaitToShoot--;
  }

  if (Player1.HP > 0){
    ctx.save();

    ctx.translate((Player1.PosX+23),(Player1.PosY+23));
    ctx.rotate(Rad1);
    ctx.translate(-(Player1.PosX+23),-(Player1.PosY+23));

    DrawPlayer1();
    if (ShouldFilterImage || Player1.HP < 100){
      FilterPlayer1(Player1.PosX, Player1.PosY);
    }

    Player1.PosX += Player1.Speed * Math.cos(Rad1);
    Player1.PosY += Player1.Speed * Math.sin(Rad1);

    ctx.restore();
  } else {
    DrawTombstone(Player1.PosX, Player1.PosY);
  }

  if (Player2.HP > 0){
    ctx.save();

    ctx.translate((Player2.PosX+23),(Player2.PosY+23));
    ctx.rotate(Rad2);
    ctx.translate(-(Player2.PosX+23),-(Player2.PosY+23));

    DrawPlayer2();
    if (ShouldFilterImage || Player2.HP < 100){
      FilterPlayer2(Player2.PosX, Player2.PosY);
    }

    Player2.PosX += Player2.Speed * Math.cos(Rad2);
    Player2.PosY += Player2.Speed * Math.sin(Rad2);

    ctx.restore();
  } else {
    DrawTombstone(Player2.PosX, Player2.PosY);
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

  // Kollisionscheckar
  CheckBounds();
  if (Player1.HP > 0 && Player2.HP > 0)
    PlayersCollide();
  PlayerCollideWBullet();
  PlayersCollideWBarrier();
  BulletCollideWBarrier();
  RemoveBullets();

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

  // Nollställ hastigheterna
  Player1.Speed = 0;
  Player2.Speed = 0;

  if (ShouldFilterImage){
    FilterImage();
  }
}
