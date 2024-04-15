import { useState, useEffect } from "react";
import axios from "axios";
import { SongTiles } from "../../Components";
import { useLoginContext } from "../../Context/loginContext";

export function MySongsPage() {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState(null);
  const {loginState} = useLoginContext()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/song/my/songs",
          {
            params: {
              token: token,
            },
          }
        );

        if (response.data.success === true) {
          setSongs(response.data.songs);
        //   dispatch({
        //     type: "SET_ALL_SONGS",
        //     payload: { songs: response.data.songs },
        //   });
        }
      } catch (err) {
        console.log("Error occured : ", err);
        
      }
    })();
  }, []);



  return (
    <div className="all-songs m-4 flex flex-col ">
      <div className=" font-bold text-5xl mb-4 text-white flex justify-center">
        My Songs
      </div>

      {
        loginState ?
      songs ?
      songs.length === 0 ? 
      (
        <div className="text-white flex flex-col gap-4 items-center justify-center">
          <div className="text-4xl">No songs available</div>

         
          <div className="text-sm">
            To create your own song, click on Upload Song in Navbar
          </div>
          <div>Login to see your songs</div>
    
        </div>
      ) : (
        songs.map((song) => <SongTiles key={song._id} {...song} />)
      )
      
      :

      <div className="flex justify-center items-center text-white">Loading ...</div>

      :

      <div className="flex justify-center items-center text-white">Login to see songs you Uploaded</div>
    
    }
    </div>
  );
}
