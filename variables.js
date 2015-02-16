var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Sound = {
  'SFX' : true,
  'Music' : true
}

var Player1 = {
  'Name' : "Player 1",
  'Speed' : 0,
  'Spin' : 0,
  'Left' : false,
  'Right' : false,
  'Up' : false,
  'Down' : false,
  'IsShooting' : false,
  'PosX' : 0,
  'PosY' : 0,
  'WaitToShoot' : 0,
  'HP' : 100
};

var Player2 = {
  'Name' : "Player 2",
  'Speed' : 0,
  'Spin' : 0,
  'Left' : false,
  'Right' : false,
  'Up' : false,
  'Down' : false,
  'IsShooting' : false,
  'PosX' : 0,
  'PosY' : 0,
  'WaitToShoot' : 0,
  'HP' : 100
};

var Players = [Player1, Player2];

var Obstacle1 = {
  'Left' : 290,
  'Right' : 315,
  'Up' : 60,
  'Down' : 210,
  'Width' : 25,
  'Height' : 150
};

var Obstacle2 = {
  'Left' : 290,
  'Right' : 315,
  'Up' : 390,
  'Down' : 540,
  'Width' : 25,
  'Height' : 150
};

var Obstacle3 = {
  'Left' : 60,
  'Right' : 210,
  'Up' : 290,
  'Down' : 315,
  'Width' : 150,
  'Height' : 25
};

var Obstacle4 = {
  'Left' : 390,
  'Right' : 540,
  'Up' : 290,
  'Down' : 315,
  'Width' : 150,
  'Height' : 25
};

var Obstacles = [Obstacle1, Obstacle2, Obstacle3, Obstacle4];

// Bullets
var Bullets = [];
var BulletSpeed = 15;

// Scoreboard
var Scoreboard = [];
var WinnerAdded = false;

var ShouldFilterImage = false;
