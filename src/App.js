import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/App.scss";
import data from "./data";
import Library from "./components/Library";
import LibrarySong from "./components/LibrarySong";
import Nav from "./components/Nav";

function App() {
  // state
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
});
const[libraryStatus, setLibraryStatus] =  useState(false);
const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration:duration});
};


  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus}
           setLibraryStatus={setLibraryStatus}
       />
      <Song currentSong={currentSong} />
      <Player
      setCurrentSong={setCurrentSong}
      songs={songs} 
      audioRef={audioRef}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      audioRef={audioRef}
      setIsPlaying={setIsPlaying}
       isPlaying={isPlaying}
       currentSong={currentSong}
       setSongs={setSongs}/>
      <Library libraryStatus={libraryStatus} songs={songs} setCurrentSong = {setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} isPlaying={isPlaying}/>
      <audio 
            onLoadedMetadata={timeUpdateHandler}
             onTimeUpdate={timeUpdateHandler} 
             ref={audioRef} 
             src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
