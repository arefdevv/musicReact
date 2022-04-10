import React from 'react';

const Song = ( {currentSong}) => {
    return (
        <div className="song-container">
            <img src={currentSong.cover} alt={currentSong.name}/>
            <h1 className="song-name">{currentSong.name}</h1>
            <h1 className="artist-name">{currentSong.artist}</h1>
        </div>
    )
}

export default Song;