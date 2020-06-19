const express = require('express')
const app = express()
const users = require('./routes/usersRoute')
const login = require('./routes/loginRoute')
const settings = require('./routes/settingRoute')
const mongoose = require('mongoose')
const env = require('./env')

app.use(express.json({limit:"100kb"}))

app.use("/users", users)
app.use("/login",login)
app.use("/settings",settings)

mongoose
.connect(process.env.DB || env.db, {useNewUrlParser:true, useUnifiedTopology: true,})
.then(()=>{
        console.log('DB connected')
    })
.catch((err)=>{console.log(`DB Error ${err}`)})

app.listen(env.port, (err)=>{
    if(err) console.log(err)
    else console.log(`listening on port ${process.env.PORT || env.port}`)
})