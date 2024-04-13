// const mongoose = require('mongoose')

// const artistSchema = new mongoose.Schema({
//     firstName:{
//         type:String,
//         required:true
//     },
//     lastName:{
//         type:String,
//     },
//     username:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     artistPhoto:{ // link of a cloud db
//         type:String,
//         required:true
//     },
//     followers:{
//         type:Number,
//         defaullt:0
//     },
//     songs:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Song"
//     }],
   
// },{timestamps :true})


// const Artist = mongoose.model("Artist",artistSchema)


// module.exports = Artist