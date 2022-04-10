import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPause,faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {playAudio} from './util';

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setCurrentSong, setSongs }) => {
    
    // useEffect
    useEffect(()=> {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){
                return {
                    ...song,
                    active:true,
                }
            }
            else{
                return{
                    ...song,
                    active:false,
                }
            }
        });
        setSongs(newSongs);
    }, [currentSong])
    // event handlers

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        setSongInfo({...songInfo, currentTime: e.target.value})
        audioRef.current.currentTime = e.target.value;
    }

    const skipTrackhandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "skip-forward"){
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        else if(direction === "skip-back"){
            if((currentIndex - 1) % songs.length === -1){
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[currentIndex - 1]);
        }
        playAudio(isPlaying, audioRef);
    };


    
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0}
                 max={songInfo.duration || 0} 
                 value={songInfo.currentTime} 
                 onChange={dragHandler}
                 type="range"/>
                 <p>{songInfo.duration ?  getTime(songInfo.duration) : "0:00"}</p>
                </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackhandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackhandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>
    )
}

export default Player;