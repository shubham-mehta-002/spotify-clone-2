import {useNavigate} from 'react-router-dom'
export function Profile(){
    const navigate = useNavigate();
    function logoutHandler(){
        localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <div className="absolute right-0 text-white h-18 w-32 bg-[rgb(40,40,40)] border-1 border-customLightBlack border-solid rounded">
            <div className='p-2  h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)]  ml-1 text-sm text-white flex justify-start items-center'>Account</div>
            <div className="p-2  h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center border-t-2 border-bottom-solid border-white"
            onClick={logoutHandler}>Logout</div>
            
        </div>
    )
}