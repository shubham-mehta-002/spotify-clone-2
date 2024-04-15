const express = require('express')
const app=express()
require('dotenv').config()
// const passport= require('passport')
// const LocalStrategy = require('passport-local').Strategy
const cors = require('cors')
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user.model')
const port = process.env.PORT || 4000

const authRoutes = require('./router/auth')
const songRoutes = require('./router/song')
const artistRoutes = require('./router/artist')
const playlistRoutes = require('./router/playlist')

var cookieParser = require('cookie-parser')

const {connectWithDb} = require('./db/connectWithDb')


app.use(cors())

// {
//     origin:"http://localhost:5174",
//     credentials: true,  
// }
// app.use(cookieParser())

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SECRET_KEY;

// passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
//     try {
//         const user = await User.findOne({ id: jwt_payload.sub });
//         if (user) {
//             return done(null, user); // User found
//         } else {
//             return done(null, false); // User not found
//         }
//     } catch (err) {
//         return done(err, false); // Error occurred
//     }
// }));


// connect with mongoDB atlas
connectWithDb()
.then(res => console.log("Successfully connected with Db "))
.catch(err=> console.log("Error occured while connecting with database !!"))

app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.use('/auth',authRoutes)
app.use('/song',songRoutes)
app.use('/artist',artistRoutes)
app.use('/playlist',playlistRoutes)



app.listen(port,()=>{
    console.log("App running at PORT : ",port)
})
