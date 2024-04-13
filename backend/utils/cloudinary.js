const {v2 : cloudinary} = require('cloudinary')


// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET 
// });


async function uploadOnCloudinary({thumbnail , track , folderName}){
    try{
        if(!thumbnail || !track) 
        {
            console.log("sab de na")
            return null
        }
        // upload file on cloudinary
        const thumbnailResponse = await cloudinary.uploader.upload(thumbnail,{
            resource_type:"auto",
            folder:Playlist
        })
      // case baaki h agar response nhi aata to DO IT LATER
        const trackResponse = await cloudinary.uploader.upload(track,{
            resource_type:"auto",
            folder:"Playlist"
        })

        // file has been uploaded successfully
        console.log("Uploaded successfully")
        // console.log(response.url);

        return response
    }catch(err){
        return null; 
    }

}

module.exports={cloudinary ,uploadOnCloudinary }
