const express = require('express')
const routes = require('./routes')
const path = require('path')
const mongoose = require('mongoose')

require('dotenv').config( {path: 'config.env'} )

const session = require('express-session')
const MongoDBStore = require('connect-mongo')
const flashMessages = require('connect-flash')
const csrf = require('csurf')


const { GlobalMiddleware, checkTokenError, createToken } = require('./middlewares/Middlewares')

// SERVER BEING INITIALIZED
const server = express()


// --------- MONGO DATABASE CONNECTION --------- //

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then( () => {
    console.log(`MongoDB connection is successfully activated`)
    server.emit('MongoDbConnected');
})
.catch( (error) => {
    console.log(error)
    process.exit(1)
})

// --------- MONGO DATABASE CONNECTION --------- //


// ----------- SESSION CONFIGURATION ----------- //

const sessionOptionsConfiguration = session ( {
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,

    store: MongoDBStore.create( { mongoUrl: process.env.MONGO_URI }),
    secret: process.env.SESS_SECRET,

    cookie: {
        maxAge: Number(process.env.SESS_LIFETIME),
        httpOnly: true
    }
})

server.use(sessionOptionsConfiguration)
server.use(flashMessages())

// ----------- SESSION CONFIGURATION ----------- //


server.use(express.static(path.join(__dirname, 'public')))

server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))
server.use(express.json());
server.use(express.urlencoded( { extended: true } ))


// USING MIDDLEWARES
server.use(csrf());
server.use(GlobalMiddleware)
server.use(checkTokenError)
server.use(createToken)


server.use(routes);

module.exports = server