// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'

import { createBrowserRouter , RouterProvider } from "react-router-dom"
import {Login , Signup , Home , UploadSong , AllPlaylists ,LikedSongsPage,CreatePlaylist,SearchPage ,AddSongsToPlaylist ,PlaylistPage , MySongsPage ,ArtistPage ,AllSongsPage} from './Pages'
import {RootLayout} from './Layouts'
import { useLoginContext } from './Context/loginContext'


function App() {
  const {loginState, setLoginState} = useLoginContext()

  const router= createBrowserRouter([
    {
      path:'/',
      element:<Home />,
      children:[
        {
          path:"/",    
          element:<AllSongsPage/>
        },
        {
          path:"create/songs",
          element:<UploadSong/>
        },
        {
          path:"playlist", // my/playlist
          element:<AllPlaylists/>
        },
        {
          path:"my/songs", //my/songs
          element:<MySongsPage/>
        },
        {
          path:"create/playlist",   
          element:<CreatePlaylist/>
        },
        {
          path:"playlist/:playlistId/add/songs",    
          element:<AddSongsToPlaylist/>
        },
        {
          path:"playlist/:playlistId",    
          element:<PlaylistPage/>
        },
        {
          path:"search",    
          element:<SearchPage/>
        },
        {
          path:"liked/songs",    
          element:<LikedSongsPage/>
        },{
          path:"artist/:artistId",    
          element:<ArtistPage/>
        },
        
        
      ]
    },
    {
      path:'/login',
      element:(<Login/>)
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    
    
  ])


  return (
    <div className="h-screen w-screen font-poppins">
     <RouterProvider router={router} />
    </div>
  )
}

export default App
