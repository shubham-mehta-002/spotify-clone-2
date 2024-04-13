import {Howl, Howler} from 'howler';
import { SongTiles } from '../components/SongTiles';
import { useAppContext } from "../Context/appContext"


// import { useCurrentSongContext } from '../Context/currentSongContext';


export const playMusic = async(state ,dispatch, songData) =>{
    console.log(songData,'fw')
    if((state.currentSong) && (state.currentSong._id === songData._id)){
        if(state.isPlaying){
            dispatch({type:"TOGGLE_PLAYING" , payload:{ isPlaying : false}})
            state.currentSong.audio.pause()
        }else{
            dispatch({type:"TOGGLE_PLAYING" , payload:{ isPlaying : true}})
            await state.currentSong.audio.play()
        }
    }else{
        if(state.currentSong){
            dispatch({type:"TOGGLE_PLAYING" , payload:{ isPlaying : false}})
            state.currentSong?.audio.pause()

        }
        dispatch({type:"SET_CURRENT_SONG", payload:{currentSong : songData }})
        dispatch({type:"TOGGLE_PLAYING" , payload:{ isPlaying : true}})
        await songData?.audio.play()
        
        songData.audio.addEventListener('ended',(e)=>nextMusic(state,dispatch))

    }
}


export const nextMusic= async(state,dispatch)=>{
    console.log({state})
    const {currentSong } = state
    const songsList = state.allSongs
    if(currentSong){
     
        const index = songsList.findIndex(song => song._id === currentSong._id)
        if(index === songsList.length-1 ){
            const song = songsList[0]
            song.audio = new Audio(song.track)
            playMusic(state,dispatch,song)
        }else{
            const song = songsList[index+1]
            song.audio = new Audio(song.track)
            playMusic(state,dispatch,song)
        }
    }
    
}

export const prevMusic=(state,dispatch)=>{
    const {currentSong } = state
    const songsList = state.allSongs
        if(currentSong){
            const index = songsList.findIndex(song => song._id === currentSong._id)
            
            if(index === 0 ){
                const song = songsList[songsList.length-1]
                song.audio = new Audio(song.track)
                playMusic(state,dispatch,song)
            }else{
                const song = songsList[index-1]
                song.audio = new Audio(song.track)
                playMusic(state,dispatch,song)
            }
        }
}

// // const {currentSong , setCurrentSong} = useCurrentSongContext()
// console.log({soundSrc})
// if(currentSong){
//     currentSong.stop()
// }
// let sound = new Howl({
//     src: [soundSrc],
//     html5: true
//   });
// setCurrentSong(sound)
// sound.play();