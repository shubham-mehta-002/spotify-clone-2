import { useAppContext } from "../../Context/appContext";
import { SongTiles } from "..";
import { useState, useEffect } from "react";
import axios from "axios";
import heart from "../../images/green-heart.png";
import { playlistMusicHandler } from "../../utils/playlistMusicHandler";
import { useLoginContext } from "../../Context/loginContext";
import { useNavigate } from "react-router-dom";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom";

export function LikedSongsPage() {
  if( !localStorage.getItem('token')){    
    return( <Navigate to='/login' replace={true}/> )
  }
  const { loginState } = useLoginContext();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [likedSongs, setLikedSongs] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get("http://localhost:3000/song/liked", {
          params: {
            token,
          },
        });
        // console.log(response)
        if (response.data.success) {
          setLikedSongs(response.data.likedSongs);
          dispatch({
            type: "SET_ALL_SONGS",
            payload: { songs: response.data.likedSongs },
          });
        }
        console.log("helo", response.data);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="h-full w-full bg-customLightBlack text-white overflow-x-hidden overflow-y-auto">
      <div className="h-1/3 w-full flex flex-row justify-between">
        <div className="header flex flex-row items-center w-full">
          <div className="playlist-thumbnail h-full w-1/2 m-3 flex items-center justify-center">
            <img src={heart} className="h-9/10 w-9/10 rounded object-cover" />
          </div>

          <div className="playlist-data h-4/3 w-full  flex flex-col gap-3">
            <div className="text-8xl font-semibold word">Liked Songs</div>
            <div className=" text-base">
              {likedSongs ? likedSongs.length : 0} items{" "}
            </div>
            {/* <div className=" text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">{playlistData.collaborators && playlistData.collaborators.join(' | ')}</div> */}
          </div>
        </div>
      </div>

      {likedSongs && likedSongs.length !== 0 && (
        <div className="py-3 w-1/4 flex justify-start items-center"
        onClick={(e) =>
          !loginState
            ? navigate("/login")
            : playlistMusicHandler(likedSongs, state, dispatch)
          }
        >

        {
          state.isPlaying ? 
          <FaPauseCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20" />
          :
          <FaPlayCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20"/>
          
        }
        </div>
        
      )}
     
      <hr className="customGray m-4" />

      <div>
        {likedSongs.map((song) => (
          <SongTiles key={song._id} {...song} />
        ))}
      </div>


    </div>
  );
}
