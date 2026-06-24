let play = document.getElementById("play");
let progressBar = document.getElementById("progressBar");
let audio = new Audio("Audio/audio1.mp3");

let currentSong = 1;

play.addEventListener("click", () => {
  if (audio.paused || audio.currentTime == 0) {
    audio.play();
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    play.classList.remove("fa-circle-pause");
    play.classList.add("fa-circle-play");
  }
});

audio.addEventListener("timeupdate", () => {
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient (to right, #21a600ff ${progress}%, #333 ${progress}%) `;
});

progressBar.addEventListener("input", function () {
  let value = this.value;
  this.style.background = `linear-gradient (to right, #21a600ff ${value}%, #333 ${value}%) `;
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName("playMusic"));

makeAllPlay = () => {
  playMusic.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

playMusic.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlay();
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");

    index = parseInt(e.target.id);
    currentSong = index;
    audio.src = `Audio/${index}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
  });
});

let allMusic = Array.from(document.getElementsByClassName("music-card"));
songs = [
  {
    songName: "Assa Kooda",
    songDes: "Sai Abhyankkar,Sai Smriti",
    songImage: "Images/img1.jpg",
    songPath: "Audio/1.mp3",
  },
  {
    songName: "Paper Rings",
    songDes: "Taylor Swift",
    songImage: "Images/img2.jpg",
    songPath: "Audio/2.mp3",
  },
  {
    songName: "I Guess",
    songDes: "KR$NA",
    songImage: "Images/img3.jpg",
    songPath: "Audio/3.mp3",
  },
  {
    songName: "Safar",
    songDes: "Juss, MixSingh",
    songImage: "Images/img4.jpg",
    songPath: "Audio/4.mp3",
  },
  {
    songName: "Bairan",
    songDes: "Banjaare",
    songImage: "Images/img5.jpg",
    songPath: "Audio/5.mp3",
  },
  {
    songName: "Sheesha-Akhya Mai Aakh Gali Jo Bairan",
    songDes: "Mitta Ror, Swara Verma",
    songImage: "Images/img6.jpg",
    songPath: "Audio/6.mp3",
  },
  {
    songName: "Tere Liye",
    songDes: "Atif Aslam,Shreya Ghoshal,Sachin Gupta,Sameer Anjan",
    songImage: "Images/img7.jpg",
    songPath: "Audio/7.mp3",
  },
  {
    songName: 'Dhurandhar-Title Track(From "Dhurandhar")',
    songDes: "Shashwat Sachdev,Hanumankind,Jasmine Sandlas",
    songImage: "Images/img8.jpg",
    songPath: "Audio/8.mp3",
  },
  {
    songName: "Boyfriend",
    songDes: "karan Ajula,lkky",
    songImage: "Images/img9.jpg",
    songPath: "Audio/9.mp3",
  },
  {
    songName: "Khat",
    songDes: "Navjot Ahuja",
    songImage: "Images/img10.jpg",
    songPath: "Audio/10.mp3",
  },
  {
    songName: "AZUL",
    songDes: "Guru Randhawa,Gurjit Gill,Lavish Dhiman",
    songImage: "Images/img11.jpg",
    songPath: "Audio/11.mp3",
  },
  {
    songName: "Sirra",
    songDes: "Guru Randhawa,Kiran Bajwa,Rony Ajnali",
    songImage: "Images/img12.jpg",
    songPath: "Audio/12.mp3",
  },
  {
    songName: "São Paulo(feat.Aniita)",
    songDes: "The Weekend,Anitta",
    songImage: "Images/img13.jpg",
    songPath: "Audio/13.mp3",
  },
  {
    songName: "Sahiba",
    songDes: "AaAditya Rikhari",
    songImage: "Images/img14.jpg",
    songPath: "Audio/14.mp3",
  },
  {
    songName: "One Love",
    songDes: "Shubh",
    songImage: "Images/img15.jpg",
    songPath: "Audio/15.mp3",
  },
  {
    songName: "Sapphire",
    songDes: "Ed Sheeran",
    songImage: "Images/img16.jpg",
    songPath: "Audio/16.mp3",
  },
  {
    songName: "Finding Her",
    songDes: "Kushagra,Bharath,Saaheal",
    songImage: "Images/img17.jpg",
    songPath: "Audio/17.mp3",
  },
  {
    songName: "Dooron Dooron",
    songDes: "Paresh Pahuja,Shiv Tandan,Meghdeep Bose",
    songImage: "Images/img18.jpg",
    songPath: "Audio/18.mp3",
  },
  {
    songName: "Deewana Kar Raha hai",
    songDes: "Javed Ali",
    songImage: "Images/img19.jpg",
    songPath: "Audio/19.mp3",
  },
  {
    songName: "Hass Hass",
    songDes: "Diljit Dosanjh,Sia,Greg Kurstin",
    songImage: "Images/img20.jpg",
    songPath: "Audio/20.mp3",
  },
  {
    songName: 'Shararat(From "Dhurandhar")',
    songDes: "Shashwat Sachdev,Madhubanti Bagchi,Jasmine Sandlas",
    songImage: "Images/img21.jpg",
    songPath: "Audio/21.mp3",
  },
  {
    songName: "Sar Sukhachi Shravani",
    songDes: "Abhijeet Sawant,Bela Shende",
    songImage: "Images/img22.jpg",
    songPath: "Audio/22.mp3",
  },
  {
    songName: "Sundari",
    songDes: "Sanju Rathod,G-SPXRK",
    songImage: "Images/img23.jpg",
    songPath: "Audio/23.mp3",
  },
  {
    songName: "Tuzyya Pirticha vichu Chawla",
    songDes: "Ajay Gogavale,Ajay-Atul",
    songImage: "Images/img24.jpg",
    songPath: "Audio/24.mp3",
  },
  {
    songName: "Mi Haay Koli",
    songDes: "Shrikant narayan",
    songImage: "Images/img25.jpg",
    songPath: "Audio/25.mp3",
  },
  {
    songName: "Apsara Aali",
    songDes: "Ajay Gogavale,Ajay-Atul,Bela Shende",
    songImage: "Images/img26.jpg",
    songPath: "Audio/26.mp3",
  },
  {
    songName: "Rani Majhya Malyamandi",
    songDes: "Avadhoot Gupte,Vaishali Samant",
    songImage: "Images/img27.jpg",
    songPath: "Audio/27.mp3",
  },
  {
    songName: "Paplet",
    songDes: "Zubaan Music,Chintamani",
    songImage: "Images/img28.jpg",
    songPath: "Audio/28.mp3",
  },
];

order = [...songs];

allMusic.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].songImage;
  element.getElementsByClassName("img-title")[0].innerText = songs[i].songName;
  element.getElementsByClassName("img-description")[0].innerText =
    songs[i].songDes;
});

let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");
let nowBar = document.querySelector(".now-bar");

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs(originalOrder) {
  order = [...originalOrder];
  for (i = order.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

shuffle.addEventListener("click", () => {
  if (!songOnShuffle) {
    songOnShuffle = true;
    songOnRepeat = false;
    shuffle.classList.add("active");
    repeat.classList.remove("active");

    order = shuffleSongs(songs);
  } else {
    songOnShuffle = false;
    shuffle.classList.remove("active");
    order = songs;
  }
});

repeat.addEventListener("click", () => {
  if (!songOnRepeat) {
    songOnRepeat = true;
    songOnShuffle = false;
    repeat.classList.add("active");
    shuffle.classList.remove("active");
  } else {
    songOnRepeat = false;
    repeat.classList.remove("active");
  }
});

playNextSong = () => {
  if (!songOnRepeat) {
    let nextSong = (currentSong + 1) % playMusic.length;
    currentSong = nextSong == 0 ? 30 : nextSong;
    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
  } else {
    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
    updateNowBar();
  }
};

playPrevSong = () => {
  if (!songOnRepeat) {
    currentSong = currentSong <= 1 ? playMusic.length : currentSong - 1;
  }

  audio.src = order[currentSong - 1].songPath;
  audio.currentTime = 0;
  audio.play();
  play.classList.remove("fa-circle-play");
  play.classList.add("fa-circle-pause");
  updateNowBar();
};
//   let prevSong = currentSong - 1;
//   currentSong = prevSong == 0 ? 30 : prevSong;
//   audio.src = `Audio/${currentSong}.mp3`;
//   audio.currentTime = 0;
//   audio.play();
// };

function updateNowBar() {
  nowBar.getElementsByTagName("img")[0].src = order[currentSong - 1].songImage;
  nowBar.getElementsByClassName("img-title-info")[0].innerText =
    order[currentSong - 1].songName;
  nowBar.getElementsByClassName("img-des-info")[0].innerText =
    order[currentSong - 1].songDes;
}

forward = document.getElementById("forward");
backward = document.getElementById("backward");

forward.addEventListener("click", () => {
  playNextSong();
});

audio.addEventListener("ended", () => {
  playNextSong();
});

backward.addEventListener("click", () => {
  playPrevSong();
});
