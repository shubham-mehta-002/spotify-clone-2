import { useEffect } from 'react';
import { useAppContext } from "../../Context/appContext.jsx"
import { useRef } from 'react';
import { prevMusic , nextMusic } from '../../utils/playMusic.jsx';
import { ImLoop } from "react-icons/im";
import { MdOutlineReplay } from "react-icons/md";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";



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
    
    function toggleLoop(e){
        console.log('giyaan ho aap',state.loop)
        dispatch({type:"TOGGLE_LOOP",payload:{loop:(!state.loop)}})
    }

    function nextSongHandler(){
        nextMusic(state,dispatch)
    }

    function prevSongHandler(){
        prevMusic(state,dispatch)
    }

    return(
        <div className="h-full w-full flex flex-row  text-black items-center ">
                    
            <div className="song-details h-9/10 w-1/4 flex flex-row items-center gap-5 mx-3">
                <div className='thumbnail h-5/6 w-1/6 rounded'>
                    <img src={thumbnail} className='h-full w-full' />
                </div>
                <div className='artist-details'>
                    <div className='artist-details text-base font-medium text-white'>{name}</div>
                    <div className='collaborators-details text-xs text-customGray font-bold text-ellipsis overflow-hidden whitespace-nowrap'>{artist.username}</div>
                </div>
            </div>

            <div className="h-full w-1/2 ">
                <div className='h-1/2 w-full flex flex-row justify-center items-center gap-5'>

                    <ImLoop onClick={toggleLoop} className='hover:cursor-pointer hover:text-white text-customGray h-6 w-6'/>

                    <GiPreviousButton  onClick={prevSongHandler} className='hover:cursor-pointer hover:text-white text-customGray h-6 w-6 h-'/>
                  
                    {
                        state.isPlaying ? 
                        <FaPause className='hover:cursor-pointer  h-8 w-8 text-white'
                        onClick={togglePlayPause}/>
                        :
                        <FaPlay className='hover:cursor-pointer  h-8 w-8 text-white'
                        onClick={togglePlayPause}/>
                    }
                    <GiNextButton  onClick={nextSongHandler} className='hover:cursor-pointer hover:text-white text-customGray  h-6 w-6'/>
                    <MdOutlineReplay  onClick={toggleRepeat} className='hover:cursor-pointer  hover:text-white text-customGray h-6 w-6'/>

                   
                </div>
                <div className='h-1/2 w-full flex flex-row justify-center items-center'>
                    <input type='range' ref={inputRef} onChange={handleProgressChange} min={0} max={100}  step={0.1}   
                    className='h-1/2 w-4/5'/>   
          
                </div>
                
            </div>
            <div className="h-full w-1/4 bg-black">
                
            </div>

        


        </div>
    )
}

