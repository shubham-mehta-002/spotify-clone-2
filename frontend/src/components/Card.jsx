import {useNavigate} from 'react-router-dom'

export function Card({cardData:{_id,name,thumbnail,owner,collaborators}})
{
    const navigate = useNavigate()
    return(
        <div  className='h-1/3 w-1/5 p-4 flex flex-wrap hover:cursor-pointer ' onClick={()=>navigate(`/playlist/${_id}`)}>
        <div className=' hover:bg-customGray w-full h-full bg-customLightBlack   rounded-md p-3'>
            <div className='h-2/3 flex items-center justify-center'>
                <img src={thumbnail} alt="image" className='h-full w-full rounded-lg' />
            </div>
            <div className='text-white text-xl font-bold my-2 mb-1 break-words text-ellipsis overflow-hidden whitespace-nowrap'>{name}</div>
            <div className='text-white text-sm font-semibold mt-2 break-words text-ellipsis overflow-hidden whitespace-nowrap'>{collaborators && collaborators.join(' | ')}</div>
        </div>
        </div>
    )
} 