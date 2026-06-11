let play = document.getElementById("play");
let progressBar = document.getElementById("progressBar");
let audio = new Audio("Audio/audio1.mp3");

play.addEventListener("click", () => {
  if (audio.paused || audio.currentTime == 0) {
    audio.play();
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
  }else{
    audio.pause();
    play.classList.remove("fa-circle-pause");
    play.classList.add("fa-circle-play");
  }
});
