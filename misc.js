function SetP1Name(){
  var Name = prompt("Name player 1: ", "");
  if (Name.length > 0){
    Player1.Name = Name;
    document.getElementById("playeronename").innerHTML = Name;
  }
}

function SetP2Name(){
  var Name = prompt("Name player 2: ", "");
  if (Name.length > 0 ){
    Player2.Name = Name;
    document.getElementById("playertwoname").innerHTML = Name;
  }
}

function ShowScoreboard(){
  var Scores = "";
  for (var i = 0; i < Scoreboard.length; i++){
    Scores += Scoreboard[i];
    Scores += "\n";
  }
  alert(Scores);
}

function ShowControls(){
  var ControlsP1 = "Player 1:\nMove with: arrow keys\nShoot with: . (dot)\n\n";
  var ControlsP2 = "Player 2:\nMove with: wasd\nShoot with: t\n\n";
  var AskFilterImage = "Colors and contrasts giving you trouble?\n"+
                       "Click 'ok' to apply a filter to the image";
  var AskRestoreImage = "Click 'ok' to revert the filter";
  if (confirm(ControlsP1+ControlsP2+(ShouldFilterImage ? AskRestoreImage : AskFilterImage))){
    if (ShouldFilterImage) ShouldFilterImage = false;
    else ShouldFilterImage = true;
  }
}

function MusicMute(){
  var Current = document.getElementById("musicp").innerHTML;
  if (Current == "Music: on")
  {
    document.getElementById("musicp").innerHTML = "Music: off";
    MuteMusic(true);
  }
  if (Current == "Music: off")
  {
    document.getElementById("musicp").innerHTML = "Music: on";
    MuteMusic(false);
  }
}

function SFXMute(){
  if (Sound.SFX)
  {
    Sound.SFX = false;
    document.getElementById("sfxp").innerHTML = "SFX: off";
  }
  else
  {
    Sound.SFX = true;
    document.getElementById("sfxp").innerHTML = "SFX: on";
  }
}
