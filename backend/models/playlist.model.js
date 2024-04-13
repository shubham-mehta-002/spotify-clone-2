const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{         // link of a cloud db
        type:String,
        required:true,
        default:"https://res.cloudinary.com/dudcrgnld/image/upload/v1712435995/playlist-bg_pxfsvx.jpg"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    collaborators:[{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"User"
        type:String
    }],
    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    visibilityMode:{
        type:String,
        defaut:"private"
    }
   
},{timestamps :true})


const Playlist = mongoose.model("Playlist",playlistSchema)


module.exports = Playlist