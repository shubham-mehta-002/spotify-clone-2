const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please enter fist name"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    username : {
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    likedSongs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    recentPlays:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    subscribedArtists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    createdPlaylists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Playlist"
    }],
    accountType:{
        type:String,
        enum:["free","premium"],
        dafault:"free"
    },
    songsOwned:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }]
   

    
},)


const User = mongoose.model("User",userSchema)


module.exports = User