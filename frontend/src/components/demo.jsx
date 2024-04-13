import { playMusic } from "../utils/playMusic";
import { useCurrentSongContext } from '../Context/currentSongContext';

export function demo({url})
{
    const {currentSong , setCurrentSong} = useCurrentSongContext()

    playMusic(currentSong)
    return(
        <></>
    )
}