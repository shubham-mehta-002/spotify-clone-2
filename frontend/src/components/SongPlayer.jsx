import greenHeart from '../images/green-heart.png'
import playButton from '../images/playButton-white.png'
import { useCurrentSongContext } from '../Context/currentSongContext';
// import { playMusic } from '../utils/playMusic.jsx';
// import { pauseMusic } from '../utils/pauseMusic.jsx';
import loop from '../images/loop.png'
import next from '../images/next-song.png'
import prev from '../images/previous-song.png'
import play from '../images/playButton-white.png'
import pause from '../images/pause.png'
import restart from '../images/restart.png'
import { useEffect, useState } from 'react';
import {demo } from  '../components/demo.jsx'
import { useAppContext } from "../Context/appContext"
import { useRef } from 'react';
import { prevMusic , nextMusic } from '../utils/playMusic.jsx';

export function SongPlayer()
{
    const inputRef= useRef()
    const {state , dispatch} = useAppContext()
    const {thumbnail , artist ,name } = state.currentSong
          

    useEffect(()=>{
        if(state.currentSong){
            
            const audioElement = state.currentSong.audio
     
            const handleTimeUpdate = () =>{
                const duration = parseFloat(state.currentSong.duration)
          
                const currentTime= audioElement.currentTime;
            
                const newTiming = (currentTime/duration)*100
                inputRef.current.value = newTiming
            }

            const handleEndOfAudio=()=>{

                 
                    if(state.loop === true){
                        
                        state.currentSong.audio.currentTime=0
                        state.currentSong.audio.play()
                    }
                    else if(state.callNextOnEndOfCurrentSong === true){
                      
                        nextMusic(state,dispatch)
                    }else{
                      
                        dispatch({type:"SET_CURRENT_SONG", payload:{currentSong : null }})
                        dispatch({type:"TOGGLE_PLAYING" , payload:{ isPlaying : false}})
                        state.currentSong.audio.pause()
                    }

            }

            audioElement?.addEventListener('timeupdate',handleTimeUpdate)
            audioElement?.addEventListener('ended',handleEndOfAudio)

            return ()=>{
                audioElement?.removeEventListener("timeupdate",handleTimeUpdate)
                audioElement?.removeEventListener('ended',handleEndOfAudio)
            }
        }

    },[state])


    function handleProgressChange(e){
        const newPercentage = parseFloat(e.target.value);
        const newTime = (newPercentage/100)*parseFloat(state.currentSong.duration)
        if(newTime>=0){
            state.currentSong.audio.currentTime= newTime
        }
        
    }
    
    const togglePlayPause = async() =>{         
        // dispatch({type:"TOGGLE_PLAYING" , payload:{isPlaying : state.isPlaying ? false: true}})
        if(state.isPlaying){
            dispatch({type:"TOGGLE_PLAYING" , payload:{isPlaying : false}})
            state.currentSong.audio.pause()
        }else{
            dispatch({type:"TOGGLE_PLAYING" , payload:{isPlaying : true}})
            await state.currentSong.audio.play()
        }
    }
    async function toggleRepeat(e){
        state.currentSong.audio.currentTime=0
        await state.currentSong.audio.play()
        
    }
    
    // function durationHandler(e){
    //     const durationPercentage = parseFloat(e.target.value)

    //     const a = state.currentSong.duration.split(':'); // split it at the colons
    //     let seconds=0;
    //     if(a.length>2){
    //         seconds = parseInt(a[0])*60*60;
    //         seconds+= (parseInt(a[1])*60  + parseInt(a[2]) )
    //     }else{
    //         seconds+=parseInt(a[0])*60 + parseInt(a[1])
    //     }
        
    //     const newDuration = (durationPercentage /100)*parseFloat(seconds)
    //     dispatch({type: "SET_DURATION" , payload:{duration:newDuration}})
    //     console.log('current',state.currentDuration)
    // }

    function toggleLoop(e){
        console.log('giyaan ho aap',state.loop)
        dispatch({type:"TOGGLE_LOOP",payload:{loop:(!state.loop)}})
    }

    function nextSongHandler(){
        // dispatch({type:"TOGGLE_NEXT_SONG_CALL" , payload:{nextSong:true}})
        nextMusic(state,dispatch)
    }

    function prevSongHandler(){
        // dispatch({type:"TOGGLE_PREV_SONG_CALL" , payload:{prevSong:true}})
        prevMusic(state,dispatch)

    }

    return(
        <div className="h-full w-full flex flex-row text-black items-center ">
                    
            <div className="song-details h-full w-1/4 bg-white flex flex-row items-center gap-3">
                <div className='thumbnail h-5/6 w-1/6 rounded'>
                    <img src={thumbnail} className='h-full w-full' />
                </div>
                <div className='artist-details'>
                    <div className='artist-details text-base font-medium'>{name}</div>
                    <div className='collaborators-details text-xs'>{artist.username}</div>
                </div>
            </div>

            <div className="h-full w-1/2 ">
                <div className='h-1/2 w-full flex flex-row justify-center items-center gap-5'>

                    <img src={loop} onClick={toggleLoop} className='hover:cursor-pointer  h-5 w-5'/>
                    <img src={prev}  onClick={prevSongHandler} className='hover:cursor-pointer  h-5 w-5'/>
                    <img src={state.isPlaying ? pause : play} className='hover:cursor-pointer  h-8 w-8'
                        onClick={togglePlayPause}
                    />
                    <img src={next} onClick={nextSongHandler} className='hover:cursor-pointer  h-5 w-5'/>
                    <img src={restart} onClick={toggleRepeat} className='hover:cursor-pointer  h-5 w-5'/>

                   
                </div>
                <div className='h-1/2 w-full flex flex-col justify-center items-center'>
                    <input type='range' ref={inputRef} onChange={handleProgressChange} min={0} max={100}  step={0.1}   className='h-1/2 w-full'/>                    
                </div>
            </div>
            <div className="h-full w-1/4 bg-black"></div>

        


        </div>
    )
}

