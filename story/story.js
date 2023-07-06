class parallaxTiltEffect {

  constructor({element, tiltEffect}) {

    this.element = element;
    this.container = this.element.querySelector(".container");
    this.size = [300, 360];
    [this.w, this.h] = this.size;

    this.tiltEffect = tiltEffect;

    this.mouseOnComponent = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.defaultStates = this.defaultStates.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  handleMouseMove(event) {
    const {offsetX, offsetY} = event;

    let X;
    let Y;

    if (this.tiltEffect === "reverse") {
      X = ((offsetX - (this.w/2)) / 3) / 3;
      Y = (-(offsetY - (this.h/2)) / 3) / 3;
    }

    else if (this.tiltEffect === "normal") {
      X = (-(offsetX - (this.w/2)) / 3) / 3;
      Y = ((offsetY - (this.h/2)) / 3) / 3;
    }

    this.setProperty('--rY', X.toFixed(2));
    this.setProperty('--rX', Y.toFixed(2));

    this.setProperty('--bY', (80 - (X/4).toFixed(2)) + '%');
    this.setProperty('--bX', (50 - (Y/4).toFixed(2)) + '%');
  }

  handleMouseEnter() {
    this.mouseOnComponent = true;
    this.container.classList.add("container--active");
  }

  handleMouseLeave() {
    this.mouseOnComponent = false;
    this.defaultStates();
  }

  defaultStates() {
    this.container.classList.remove("container--active");
    this.setProperty('--rY', 0);
    this.setProperty('--rX', 0);
    this.setProperty('--bY', '80%');
    this.setProperty('--bX', '50%');
  }

  setProperty(p, v) {
    return this.container.style.setProperty(p, v);
  }

  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }

}

const $ = e => document.querySelector(e);

const wrap1 = new parallaxTiltEffect({
  element: $('.wrap--1'),
  tiltEffect: 'reverse'
});

const wrap2 = new parallaxTiltEffect({
  element: $('.wrap--2'),
  tiltEffect: 'normal'
});

const wrap3 = new parallaxTiltEffect({
  element: $('.wrap--3'),
  tiltEffect: 'reverse'
});

// 音乐播放器
// player
var music = document.querySelector('.music-element');
var playBtn = document.querySelector('.play');
var seekbar = document.querySelector('.seekbar');
var currentTime = document.querySelector('.current-time');
var duration = document.querySelector('.duration');

function handlePlay() {
  if (music.paused) {
    music.play();
    playBtn.className = 'pause';
    playBtn.innerHTML = '<i class="material-icons">pause</i>';
  }
  else {
    music.pause();
    playBtn.className = 'play';
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
  }
  music.addEventListener('ended', function () {
    playBtn.className = 'play';
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
    music.currentTime = 0;
  });
}

music.onloadeddata = function () {
  seekbar.max = music.duration;
  var ds = parseInt(music.duration % 60);
  var dm = parseInt(music.duration / 60 % 60);
  duration.innerHTML = dm + ':' + ds;
};
music.ontimeupdate = function () {seekbar.value = music.currentTime;};
handleSeekBar = function () {music.currentTime = seekbar.value;};
music.addEventListener('timeupdate', function () {
  var cs = parseInt(music.currentTime % 60);
  var cm = parseInt(music.currentTime / 60 % 60);
  currentTime.innerHTML = cm + ':' + cs;
}, false);


// like
var favIcon = document.querySelector('.favorite');
function handleFavorite() {
  favIcon.classList.toggle('active');
}


// repeat
var repIcon = document.querySelector('.repeat');
function handleRepeat() {
  if (music.loop == true) {
    music.loop = false;
    repIcon.classList.toggle('active');
  } else
  {
    music.loop = true;
    repIcon.classList.toggle('active');
  }
}

// volume
var volIcon = document.querySelector('.volume');
var volBox = document.querySelector('.volume-box');
var volumeRange = document.querySelector('.volume-range');
var volumeDown = document.querySelector('.volume-down');
var volumeUp = document.querySelector('.volume-up');

function handleVolume() {
  volIcon.classList.toggle('active');
  volBox.classList.toggle('active');
}

volumeDown.addEventListener('click', handleVolumeDown);
volumeUp.addEventListener('click', handleVolumeUp);

function handleVolumeDown() {
  volumeRange.value = Number(volumeRange.value) - 20;
  music.volume = volumeRange.value / 100;
}
function handleVolumeUp() {
  volumeRange.value = Number(volumeRange.value) + 20;
  music.volume = volumeRange.value / 100;
}
