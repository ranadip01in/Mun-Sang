console.log("Welcome to my Mun-Sang");

//Initializer the variables
let songIndex=0;
let audioElement = new Audio('song/1.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let masterSongName = document.getElementById('masterSongName');

//song lists
let songs=[
    {songName: "Bhakhuda Tum Hi Ho",filePath:"song/1.mp3",coverPath:"img/cover/1.jpeg"},
    {songName: "Tommar Jonno",filePath:'song/2.mp3',coverPath:'img/cover/2.jpeg'},
    {songName: "Onek kore Pabo",filePath:'song/3.mp3',coverPath:'img/cover/3.jpeg'},
    {songName: "Karone Okarone",filePath:'song/4.mp3',coverPath:'img/cover/4.jpeg'}
]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
});

//Listen to event
audioElement.addEventListener('timeupdate',()=>{
    //update seekBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;

});
//play song according to time
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value *audioElement.duration)/100;
});
//play one song at a time 
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemsPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName("songItemsPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText=songs[songIndex-1].songName;
        gif.style.opacity=1;
    })
});
//next song
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4) songIndex=1;
    else songIndex+=1;
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText=songs[songIndex-1].songName;
});
//previous song
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1) songIndex=4;
    else songIndex-=1;
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText=songs[songIndex-1].songName;
});