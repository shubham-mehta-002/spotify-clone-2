import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../Context/loginContext';
import { uploadOnCloudinary } from '../../utils/uploadOnCloudinary';
import axios from 'axios';

export function UploadSongForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError,getValues ,formState: { errors, isSubmitting } ,reset} = useForm();
  const { loginState, setLoginState } = useLoginContext();

  const validation = {
    name: {
        required: "Song name is required",
        pattern: {
            value: /^\S.*$/, // Regular expression to check for at least one non-whitespace character
            message: "Song name cannot be empty"
        }
    },
    thumbnail:{
      required: "Thumbnail is required"
    },
    track:{
      required: "Track is required"
    }
  }

  async function submitHandler(e) {
    const {name , thumbnail , track} = getValues()
    const thumbnailData = await uploadOnCloudinary(thumbnail[0],"image","Song")
    
    const trackData = await uploadOnCloudinary(track[0],"video","Song")
    // console.log('bhai',trackData.data.duration)
    const token = localStorage.getItem('token')
    const thumbnailURL = thumbnailData.data.url;
   
    const trackURL = trackData.data.url;
    if(!name || !thumbnailURL  || !trackURL) 
    {

        setError('root', { message: "Enter all fields first" });
        return;
    }

    
//   // get duration of song
//     console.log({thumbnailURL})
//     // Create an audio element 
// const audio = new Audio(thumbnailURL); 
//  let duration= undefined
// // Wait for the metadata to load 
// audio.addEventListener('loadedmetadata', function() { 
//   // Access the duration of the audio file 
//  duration = audio.duration; 
//   console.log('Duration: ' + duration + ' seconds' + typeof duration); 
// }); 


    const data = {
        name,
        thumbnail : thumbnailURL,
        track : trackURL,
        token ,
        duration:trackData.data.duration
       
    }   

    const response = await axios.post('http://localhost:3000/song/create',data)

    if(response.data.success)
    {
      console.log(response.data)
        reset()
    }
    
  }


  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} >
        <div className='form mt-8 flex flex-col gap-2'>
          <div className={'w-full flex flex-col gap-2 mb-2 '} >
            <label className="text-l font-bold" >Name</label>
            <input {...register("name",validation.name) }type="text"   placeholder="Enter song name" className="border-2 border-solid border-gray-400 p-3 rounded text-black placeholder-gray-500" />
          </div>
          {errors.name && <div className='text-sm text-red-500 '>{errors.name.message}</div>}

          <div className='flex flex-col justify-between gap-3'>
              <div className='flex flex-col h-20 gap-2'>
                <label className='text-l font-bold'>Thumbnail</label>
                <input {...register("thumbnail",validation.thumbnail)} type="file" accept="image/png, image/gif, image/jpeg"  />
              </div>
              {errors.thumbnail && <div className='text-sm text-red-500 '>{errors.thumbnail.message}</div>}
              
              <div className='flex flex-col h-20 gap-2'>
                <label className='text-l font-bold'>Audio file</label>
                <input {...register("track",validation.track)} type="file" accept=".mp3"  />
              </div>
            {errors.track && <div className='text-sm text-red-500 '>{errors.track.message}</div>}
              
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