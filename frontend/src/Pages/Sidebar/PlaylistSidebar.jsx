// import { useState, useEffect } from 'react';
import { PlaylistTiles } from "../../Pages";
// import axios from 'axios';
import { v4 as uuid } from "uuid";
import { useAppContext } from "../../Context/appContext";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import heart from "../../images/green-heart.png";
export function PlaylistSidebar() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  //     useEffect(()=>{
  //         (async ()=>{
  //             const token = localStorage.getItem('token')
  //             try{
  //                 const response = await axios.get('http://localhost:3000/playlist', {
  //                     params: {
  //                         token
  //                     }})

  //                 const playlistData=response.data.playlists

  //                 dispatch({type: "UPDATE_PLAYLIST" , payload:{playlistData}})
  //                 // setPlaylists(playlistsData)

  //             }catch(err)
  //             {
  //                 console.log(err)
  //             }
  //         })()
  //     },[])
  // console.log({state})
  // console.log('playlist',{state})

  return (
    <div className="playlists-container h-full w-full  flex flex-col justify-start">
      {/* liked Song tile */}
      <div
        key={uuid()}
        onClick={() => navigate("liked/songs")}
        className=" h-1/5 will-change-auto p-1 text-white  m-1 flex flex-row gap-4 hover:bg-customGray hover:cursor-pointer rounded-md"
      >
        <div className="h-9/10 w-1/5 ">
          <img src={heart} className="h-full w-full rounded" />
        </div>

        <div className="h-full w-3/5 flex flex-col justify-around ">
          <div className="text-lg">Liked Songs</div>
          <div className="text-sm">
            {state.likedSongs ? state.likedSongs.length : 0}
            <span> songs</span>
          </div>
        </div>

        {/*
                <div className="h-full w-1/5 flex items-center justify-center "  >
                     <img src={plus}  */}
        {/* // onClick={addSongsToPlaylistClickHandler} */}
        {/* className='h-6 w-6 hover:scale-125 hover:cursor-pointer ' /> 
                </div> 
                */}
      </div>

      {/* playlist tiles */}
      {state.playlists &&
        state.playlists.map((playlist) => (
          <PlaylistTiles key={playlist._id} playlist={playlist} />
        ))}
    </div>
  );
}
