import greenHeart from '../images/green-heart.png'
import whiteHeart from '../images/white-heart.png'
import play from '../images/playButton-white.png'
import pause from '../images/pause.png' 
import tick from '../images/Tick.png'
import addToPlaylistButton from '../images/addToPlaylistButton.png'
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppContext } from "../Context/appContext"
import { useNavigate } from 'react-router-dom'
import { playMusic , nextMusic ,prevMusic} from '../utils/playMusic'
import { useCurrentSongContext } from '../Context/currentSongContext';


export function SongTiles({_id,thumbnail,name,track,artist,duration, addButton ,playlistId,alreadyInPlaylist , allSongs})
{
    const navigate= useNavigate()
    const {state , dispatch} = useAppContext()
    
    const isLiked = state.likedSongs.includes(_id)
    const newAudio = new Audio(track)

    const songData={
        _id,thumbnail,name,track,artist,isLiked,duration,audio:newAudio
    }

    const token  = localStorage.getItem('token')
    const songId = _id;
    const songBody={
        token,
        songId,
        playlistId
    }


    


    async function addToPlaylistHandler(e)  
    {
        // console.log('BHAIIIIIIIIIIIIIIII')
        // console.log(isAddedToPlaylist , 'BHAIIIIIIIIII')
        const response = await axios.post('http://localhost:3000/playlist/add/song',songBody)
        if(response.data.success === true)
        {
            // console.log({response})
            e.stopPropagation();    // Stop event propagation to prevent parent div click
            dispatch({type:"ADD_SONG_TO_PLAYLIST",payload:{playlistId,songId}})
            
        }
    }

    async function removeFromPlaylist(e){
        // console.log('remove from playlists called ...',name)
        const response = await axios.post('http://localhost:3000/playlist/remove/song',{
            playlistId,
            songId,
            token
        })
        // console.log('remoce from playlist' , {response})
        if(response.data.success === true)
            {
                e.stopPropagation();    // Stop event propagation to prevent parent div click
                dispatch({type:"REMOVE_SONG_FROM_PLAYLIST" , payload:{playlistId,songId}})
            }
            // addToPlaylist(false)
        // console.log('remove songs ka :',{response})
    }

    async function addToLikedSongsHandler(e)
    {  
        try{
            // console.log('like me clicked ...')
            const response = await axios.post('http://localhost:3000/song/like',{
                    songId,
                    token
                }) 
            
            // console.log('reposne from liking the server ',{response})
            if(response.data.success === true)
            {
                e.stopPropagation();    // Stop event propagation to prevent parent div click
                dispatch({ type:"ADD_TO_LIKED_SONGS" , payload:{songId:_id}})
            }
        }catch(err){
            console.log(err)
        }
        
    }

    async function removeFromLikedSongsHandler(e)
    {
        try{
            const response = await axios.post('http://localhost:3000/song/unlike',{
                songId,
                token
            })
            // console.log('remove lik api reposne ',{response})
            if(response.data.success === true){
             
                e.stopPropagation();    // Stop event propagation to prevent parent div click
                dispatch({ type:"REMOVE_FROM_LIKED_SONGS" , payload:{songId:_id}})
            }
        }catch(err){
            console.log(err)
        }
        
    }

    function toggleLike(e){
        e.stopPropagation();    // Stop event propagation to prevent parent div click
        isLiked ? removeFromLikedSongsHandler(e) : addToLikedSongsHandler(e)
    }
    function toggleAddInPlaylist(e){
        // console.log({state},  'function fro playlist')

        // console.log('hi')
        // console.log(isAddedToPlaylist)
        alreadyInPlaylist ? removeFromPlaylist(e) :  addToPlaylistHandler(e)
    }

    async function toggleMusicPlay(){
        playMusic(state ,dispatch, songData)
    }


    return(
        <div 
            
            className="hover:bg-customGray bg-customLightBlack text-white  song-tile h-20 w-full  flex flex-row justify-between items-center gap-3 mx-2 rounded">
            <div className=" details h-full w-1/2 flex flex-row gap-6 items-center">
                <div className="thumbnail h-4/5 w-1/5 ml-2 h-">
                    <img src={thumbnail}  className=" h-4/5 w-full rounded"/>
                </div>
                <div className="h-full w-1/2 flex flex-col justify-center items-center gap-2">
                    <div className=" h-1/3 w-full whitespace-nowrap overflow-hidden text-ellipsis  text-xl font-semibold">
                        <span>{name}</span></div>

                    <div className="h-1/3 w-full whitespace-nowrap overflow-hidden text-ellipsis ">
                        <span className='hover:cursor-pointer hover:underline'
                            onClick={(e)=>navigate(`/artist/${artist._id}`)}    
                        >
                            {artist.username}
                        </span></div>
                </div>
             
            </div>           
            
            <div className=" play h-full w-1/2 flex flex-row items-center justify-end gap-5 ">
            {addButton && 
            <img src={alreadyInPlaylist ? tick : addToPlaylistButton} className='hover:cursor-pointer h-7 w-7' onClick={(e)=>toggleAddInPlaylist(e)}/>
            }
            <img 
                className='hover:cursor-pointer h-6 w-6' 
                src={isLiked? greenHeart : whiteHeart} 
                onClick={(e)=>toggleLike(e)}
            />
            <img className='hover:cursor-pointer h-6 w-6 mr-5' src={ state.currentSong && state.currentSong._id === _id ? (state.isPlaying ? pause : play) : play} 
            onClick={toggleMusicPlay}/>
            </div>
            

        </div>
    )
}

