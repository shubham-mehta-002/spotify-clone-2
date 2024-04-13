import { PlaylistView } from "./PlaylistView"
// import spotifyLogo from '../images/spotifyLogo.png'
import { useEffect , useState } from "react"
import axios from 'axios'

export function AllPlaylists()
{
    //     // will fetch this data from api
    //     const data=[{
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     },
    //     {
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     },
    //     {
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     },
    //     {
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     },
    //     {
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     },
    //     {
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     },
    //     {
    //         title:"hello",
    //         description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
    //         image:{spotifyLogo}
    //     }
    // ]
    const [playlistData, setPlaylistData] = useState([])
    const token = localStorage.getItem('token')

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('http://localhost:3000/playlist',{
                    params:{
                        token:token
                    }
                })
                const filteredData = response.data.playlists.filter(playlist => playlist.visibilityMode==='public')
                setPlaylistData(filteredData)
            }catch(err)
            {
                console.log("Error occurred : ",err)
            }
        })()
    },[])


    return(
        <div>        
        {
            playlistData.length===0 ?

            <div className="all-songs m-4 flex flex-col ">
                <div className="text-white flex flex-col gap-4 items-center justify-center">
                    <div className="text-4xl">
                        No playlist available
                    </div> 
                    <div className="text-sm">
                        To create your own playlist, click on Create Playlist in the Sidebar 
                    </div>
                </div>
            </div>
            
            :

            <div className='cards p-5 h-9/10 w-full  flex flex-col gap-4'>
                 <div className=' font-bold text-5xl mb-4 text-white flex justify-center'>All Playlists</div>
                   <PlaylistView cardsData={playlistData}/> 
            </div> 
        }      
        </div>
    )
}