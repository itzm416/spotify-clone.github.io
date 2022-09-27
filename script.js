let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('progressbar');
let mastersongname = document.getElementById('mastersongname');
let gif = document.getElementById('gif');
let songsitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "David Guetta", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Señorita", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Thrift Shop", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Tonight Im Lovin", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Flo Rida", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Marwa Loud", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Ariana Grande", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Snoop Dogg", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Duncan Laurence", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Let Me Down ", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songsitems.forEach((element, i) => {
    element.getElementsByClassName('songnames')[0].innerText = songs[i].songName
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
});

// audioElement.play()
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeallplays();
    } else {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
        makeallplays();
    }
})

// percentage = (currenttime / duration) * 100
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value = progress;
})

// currenttime = percentage * duration / 100
progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration/100;
})

const makeallplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e) => {
        makeallplays();
        if(audioElement.paused || audioElement.currentTime<=0){
            songindex = parseInt(e.target.id)
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songindex+1}.mp3`;
            // mastersongname.innerText = songs[songindex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            audioElement.pause();
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
            makeallplays();
        }
    })
})

document.getElementById('next').addEventListener('click', ()=> {
    if(songindex>=9){
        songindex = 0;
    } else {
        songindex += 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    // mastersongname.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeallplays();
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songindex<=0){
        songindex = 0;
    } else {
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    // mastersongname.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeallplays();
})

