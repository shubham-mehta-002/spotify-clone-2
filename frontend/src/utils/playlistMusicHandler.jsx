import { playMusic } from "./playMusic"
export const playlistMusicHandler=(state,dispatch)=>{
   
    dispatch({type:"CALL_NEXT_SONG" , payload:{callNextOnEndOfCurrentSong : true}})
    const newAudio  = new Audio(state.allSongs[0].track)

    const songData = {...state.allSongs[0] , audio : newAudio}
   

    playMusic(state,dispatch,songData)
}