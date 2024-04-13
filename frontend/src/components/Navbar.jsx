import { NavLink , Link , useNavigate} from 'react-router-dom'
import { useLoginContext } from '../Context/loginContext'
import {Profile} from './Profile'
import Cookies from 'js-cookie'
import user from '../images/user.png'
import { useState } from 'react'
export function Navbar()
{
    const {loginState,setLoginState} = useLoginContext()
    const navigate = useNavigate()
    const [profileVisibility , setProfileVisibility] = useState('hidden')
    return(
        <div className="h-1/10 w-full bg-customOpacityBlackBg rounded flex flex-row justify-between items-center gap-4 bg-blend-normal relative">
            
            <div className="ml-5">
                <button className="hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l"><span ><NavLink  to="/">All Songs</NavLink></span></button>
                
                <button className="hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l"><span className="hover:text-white hover:scale-110 text-customGray rounded-full mx-2 font-bold text-l"><NavLink to="my/songs">My songs</NavLink></span></button>
                
                <button className="hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l"><span className="hover:text-white hover:scale-110 text-customGray rounded-full mx-2 font-bold text-l"><NavLink to="/playlist">All Playlists</NavLink></span></button>
            </div>

            <div className='flex justify-center items-center'>
            {!loginState && <button className="text-white opacity-100 hover:scale-110 py-3 mr-2 rounded-full px-6 font-bold text-l"><NavLink to="/signup">Sign up</NavLink></button>}
            
            {!loginState && <button className="hover:scale-110 py-2 mr-2 rounded-full px-6 font-bold text-l text-black bg-white border-2 border-solid border-white"><NavLink to="/login">Log in</NavLink></button>}
            
            {/* {loginState && <button className="hover:scale-110 py-2 mr-2 rounded-full px-6 font-bold text-l text-black bg-white border-2 border-solid border-white" onClick={
                (e)=>{
                    console.log("on logout token :",Cookies.get('token'))
                    Cookies.remove('token')
                    setLoginState(false)
                    navigate('/login')
                }
            }>Log out</button>} */}
            {loginState && <button className="hover:scale-110 hover:text-white py-2 mr-2  px-4 font-bold text-l text-customGray"  ><NavLink to="create/songs">Upload Song</NavLink></button>}
            {loginState && <button className='text-white mr-5 text-2xl'>|</button>}
            {loginState && <button><img className="hover:scale-110 h-10 w-10 rounded-full bg-white"
            src={user}  
            onClick={(e)=>setProfileVisibility((prev) => prev==='hidden'?'visible' : 'hidden')}  
            

            /></button>}
            {
                profileVisibility === 'visible' && 
                <div className='absolute right-0 bottom-2' >{<Profile profileVisibility={profileVisibility}
                setProfileVisibility={setProfileVisibility}
                
                />}</div>}

            </div>
        </div>
    )
}


