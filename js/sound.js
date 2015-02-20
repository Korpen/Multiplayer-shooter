function PlayerOneShoot(){
  if (Sound.SFX){
    var soundfx = new Audio();
    soundfx.src = 'sounds/deagle.ogg';
    soundfx.play();
  }
}

function PlayerTwoShoot(){
  if (Sound.SFX){
    var soundfx = new Audio();
    soundfx.src = 'sounds/glock18.ogg';
    soundfx.play();
  }
}

function PlayerOneHurt(){
  if (Sound.SFX){
    var soundfx = new Audio();
    soundfx.src = 'sounds/hurt1.ogg';
    soundfx.play();
  }
}

function PlayerTwoHurt(){
  if (Sound.SFX){
    var soundfx = new Audio();
    soundfx.src = 'sounds/hurt2.ogg';
    soundfx.play();
  }
}

function MuteMusic(InputVar){
  if (InputVar == true){
    music.muted = true;;
    Sound.Music = false;
  }
  if(InputVar == false) {
    music.muted = false;;
    Sound.Music = true;
  }
}

var music = new Audio();
music.src = 'sounds/music_background.ogg';

function PlayMusic(){
  music = new Audio();
  music.src = 'sounds/music_background.ogg';
  music.play();
  if (Sound.Music == false){
    music.muted = true;
  }
}

PlayMusic();
setInterval(PlayMusic, (80.6*1000));
