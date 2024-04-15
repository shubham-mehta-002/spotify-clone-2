import { useNavigate ,NavLink } from 'react-router-dom'
// import spotifyLogo from '../../../images/spotifyLogo.png'
import { spotifyLogo } from '../../../images'
import { LoginForm } from './LoginForm'

export function Login(){
    const navigate = useNavigate()
    
    return(
        <div className="h-full w-full flex item-center flex-col">
            <div className='login-header border-2 border-solid border-b-gray-400  p-4 gap-3 flex flex-row items-center justify-center'>
                <img src={spotifyLogo} className='h-16'/>
                <span className=" text-5xl font-bold">Spotify</span>
            </div>

            <div className='login-details flex  items-center flex-col w-full'>
                <div className='form w-1/3'>
                    <div className='text-xl font-bold my-6'>
                        To continue, login to Spotify
                    </div>
                    
                    <LoginForm />

                    <div className='h-0 w-full border-2 border-solid border-b-gray-400 mt-4'></div>
                    <div className='font-bold text-lg my-6 flex justify-center'>
                        Don't have an account ?
                    </div>
        
                    <button className='border-2 border-solid border-gray-400 w-full px-2 py-4 rounded-full text-l font-semibold text-gray-500'
                    onClick={()=>navigate('/signup')}>
                        SIGN UP FOR SPOTIFY
                    </button>

                    <div className='flex justify-end text-sm text-red-500 my-4'><NavLink to='/'>Go to home page</NavLink></div>

                
                </div>
            </div>
        </div>
    )
}


