import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../Context/loginContext';
import { uploadOnCloudinary } from '../../utils/uploadOnCloudinary';
import { useAppContext } from '../../Context/appContext';
import axios from 'axios';

export function CreatePlaylistForm() {
  const {state,dispatch} = useAppContext()

  const navigate = useNavigate();
  const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } , reset} = useForm();
  const { loginState, setLoginState } = useLoginContext();

  const [value, setValue] = useState({name:"",collaborators:"",visibilityMode:""});
  const [files, setFiles] = useState({ thumbnail: ""});
  const [imagePreview, setImagePreview] = useState(false)

  async function submitHandler(e) {
    const {name,collaborators,thumbnail,visibilityMode}= getValues()
    const thumbnailData = await uploadOnCloudinary(thumbnail[0],"image","Playlist")
    const token = localStorage.getItem('token')

    const thumbnailURL = thumbnailData.data.url;
   
    if(!token)
        navigate('/login')

    if(!name || !thumbnailURL  || !collaborators) 
    {
        setError('root',{message : "Enter all fields first"})
        return null;
    }
    const collaboratorsData = collaborators.split(',').map(artist => artist.trim()).filter(artist=>artist!='')
   
    const data = {
        name ,
        thumbnail : thumbnailURL,
        token ,
        collaborators:collaboratorsData,
        visibilityMode
    }   
   
    try{
        const response = await axios.post('http://localhost:3000/playlist/create',data)
        if(response.data.success)
        {          
          dispatch({type:"ADD_PLAYLIST",payload:{playlist:[response.data.playlist]}})
          setFiles({ thumbnail:null})
          setValue("")
          reset()
          // navigate('/add/songs')
        }
    }catch(err)
    {
        console.log("ERror in frontent playlist crate ",err)
    }
     
  }

  const validation={
    name:{
        required:"Song name is required",
        pattern:{
          value:/[A-Za-z0-9]+$/,
          message:"Name can't have special characters"
      }
    },
    thumbnail:{
        required:"thumbnail is required"
    },
    collaborators:{
        required:"collaborators is required",
        pattern:{
          value:/[ ,A-Za-z0-9]+$/,
          message:"Name can't have special characters"
      }
    },
    visibilityMode:{
        required:"Visiility mode is required"

    }
    
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} >
        <div className='form mt-8 flex flex-col gap-2'>
          <div className={'w-full flex flex-col gap-2 mb-4 '} >
            <label className="text-l font-bold" >Name</label>
            <input type="text"  {...register("name",validation.name)} placeholder="Enter playlist name" className="border-2 border-solid border-gray-400 p-3 rounded text-black placeholder-gray-500" />
          </div>
          {errors.name && <div className='text-red-500 txt-sm'>{errors.name.message}</div>}


          <div className={'w-full flex flex-col gap-2 mb-4 '} >
            <label className="text-l font-bold" >Collaborators</label>
            <input type="text" {...register("collaborators",validation.collaborators)} placeholder="Separate by comma" className="border-2 border-solid border-gray-400 p-3 rounded text-black placeholder-gray-500" />
          </div>
          {errors.collaborators && <div className='text-red-500 txt-sm'>{errors.collaborators.message}</div>}


          <div className={'w-full flex flex-col gap-2 mb-4 '} >
            <label className="text-l font-bold" >Visibility Mode</label>
            <div className='flex flex-row  gap-16'>
            <div><input {...register("visibilityMode",validation.visibilityMode)} type="radio" name="visibilityMode"  value="private" defaultChecked /> Private</div>
            <div><input {...register("visibilityMode",validation.visibilityMode)} type="radio" name="visibilityMode"  value="public"   /> Public</div>
            </div>
          </div>
          {errors.visibilityMode && <div className='text-red-500 txt-sm'>{errors.visibilityMode.message}</div>}
        
          <div className='flex flex-col justify-between gap-3'>
            <div className='flex flex-col h-20 gap-2'>
              <label className='text-l font-bold'>Thumbnail</label>
              <input {...register("thumbnail",validation.thumbnail)} type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => {
                        setFiles({ ...files, thumbnail: e.target.files[0] })
                        // setImagePreview(URL.createObjectURL(e.target.files[0]))
                        }} />
            </div>
             {errors.thumbnail && <div className='text-red-500 txt-sm'>{errors.thumbnail.message}</div>}
            
            
            <div>
              <button type="submit" disabled={isSubmitting} className='border-2 border-solid border-black py-2 px-4 bg-white text-black rounded-full font-semibold p-3' >{isSubmitting ? "UPLOADING":"UPLOAD"}</button>
            </div>
            {errors.root && <div className='text-sm text-red-500'>{errors.root.message}</div>}

          </div>
        </div>

      </form>
    </>
  );
}
