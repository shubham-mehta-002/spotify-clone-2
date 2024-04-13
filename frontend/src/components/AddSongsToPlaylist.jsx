import { Searching } from "./Searching"
import {useParams} from 'react-router-dom'
import { useEffect , useState} from "react"
import axios from 'axios'
import { useAppContext } from "../Context/appContext"

export function AddSongsToPlaylist()
{ 
    const {playlistId} = useParams()
    const [songsInPlaylist , setSongsInPlaylist] = useState([])
    const token = localStorage.getItem('token')
    const {state,dispatch} = useAppContext()

    useEffect(()=>{
        (async()=>{
         
            const response = await axios.get(`http://localhost:3000/playlist/${playlistId}`,{
                params:{
                    token
                }
            })
            // console.log(' use effect is re rendered')
            // console.log('addsongstoplaylist',{response})
            if(response.data.success===true)
                {   
                    // console.log(response)
                    // console.log(response.data.playlist.songs.map(song => song._id))
                    setSongsInPlaylist(response.data.playlist.songs)
                }
        })()
    },[playlistId , state.playlists])

    console.log("addsongsto",{songsInPlaylist})
    return(
        <div className="h-full w-full overflow-x-hidden overflow-y-auto">
            <Searching  
                placeholder={"Search by song name"} 
                searchBasis={["songs"]} 
                playlistId={playlistId} 
                songsInPlaylist={songsInPlaylist} 
                checkIfAlreadyInPlaylist={true}
                addButton={true}/>
        </div>
    )
}

