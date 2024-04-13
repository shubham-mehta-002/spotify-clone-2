import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {SongTiles} from '../components'
import playButton from '../images/playButton.png'
import { playlistMusicHandler } from "../utils/playlistMusicHandler"
import { useAppContext } from '../Context/appContext'

export function ArtistPage(){
    const {artistId} = useParams()
    const [artistDetails, setArtistDetails]= useState();
    const {state,dispatch}= useAppContext()
    useEffect(()=>{
        (async()=>{
            const response  = await axios.get(`http://localhost:3000/artist/${artistId}`,{
                params:{
                    artistId
                }
            })
            if(response.data.success){
                setArtistDetails(response.data.artist)
                dispatch({type:"SET_ALL_SONGS" , payload:{songs : response.data.artist.songsOwned}})

            }

        })()
    },[artistId])

   
  

    return(
        <div className='main h-full w-full text-white '>
            {
            artistDetails ? 
            <div className='h-full w-full'>
                <div className='h-1/3 w-full  flex flex-row items-center gap-5 mb-5'>
                    <div className='artist-details h-44 w-44  rounded-full border-2 borer-solid border-white flex justify-center items-center'> 
                    {artistDetails.image ? <img src={artistDetails.img}/> :  <span className='text-6xl font-semibold'>{artistDetails.firstName[0]}{artistDetails.lastName[0]}</span>}
                    </div>

                    <div className='h-full w-3/4 flex flex-col justify-center '>
                        <div className='text-8xl'>{artistDetails.username}</div>
                        <div className='text-xl'>{artistDetails.songsOwned.length} songs</div>
                    </div>
                </div>
              
                {artistDetails && artistDetails.songsOwned.length !== 0 && 
                <div className="py-3 w-1/4 flex justify-start items-center ">
                    <img src={playButton}  onClick={(e)=>playlistMusicHandler(state,dispatch)} className="hover:scale-105 hover:cursor-pointer ml-3 h-20 w-20"/>
                </div>}  
                
                <hr className="customGray m-4"/>


                <div className=' h-1/3 w-full'>
                {
                    artistDetails.songsOwned.length===0 ? 
                    <div className="text-white flex flex-col gap-4 items-center justify-center">
                        <div className="text-4xl">
                            No songs available
                        </div> 
                        <div className="text-sm">
                            To create your own song, click on Upload Song in Navbar 
                        </div>
                    </div>
                        :  
                        artistDetails.songsOwned.map(song => <SongTiles key={song._id} 
                            {...song}                             
                            />)
                
                }
                </div>
            </div>
            :

            <div>
                Loading data....
            </div>
            }
            
        </div>
    )
}