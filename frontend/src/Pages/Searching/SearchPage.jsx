import {Searching} from "../../Components"
import { useState,useEffect } from 'react'
import axios from 'axios'

export function SearchPage()
{
    const [songs , setSongs] = useState([])
    useEffect(()=>{
        (async()=>{
            const response = await axios.get('http://localhost:3000/song')
            // console.log('search page',{response})
            
            if(response.data.success===true)
                setSongs(response.data.songs)
        })()
    },[])

    return(
        <div>
            <Searching placeholder={"What do you want to listen to ?"} songsInPlaylist={songs} checkIfAlreadyInPlaylist={false}/>
        </div>
    )
}