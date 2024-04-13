import { SongTiles } from "./SongTiles"
import axios from 'axios'
import { useEffect , useState } from "react"
export function AllSongsPage()
{
    const token = localStorage.getItem('token')
    const [songs , setSongs] = useState([])
    useEffect(()=>{
        (async()=>{
            const response = await axios.get('http://localhost:3000/song/')
            if(response.data.success === true)
            {
                setSongs(response.data.songs)
                dispatch({type:"SET_ALL_SONGS" , payload:{songs : response.data.songs}})

            }
           
        })()

    },[])

    return(
        <div className="all-songs m-4 flex flex-col ">
            <div className=' font-bold text-5xl mb-4 text-white flex justify-center'>All Songs</div>
            {
                songs.length===0 ?
                
                <div className="text-white flex flex-col gap-4 items-center justify-center">
                    <div className="text-4xl">
                        No songs available
                    </div> 
                    <div className="text-sm">
                        To create your own song, click on Upload Song in Navbar 
                    </div>
                </div>
                :

                songs.map(song=><SongTiles key={song._id} {...song}/>)
            }           
        </div>
    )
}