const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoute')

const app = express()
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
mongoose.connect('mongodb+srv://gargpiyush195:jkjk1806@cluster0-vh1hd.mongodb.net/test?retryWrites=true&w=majority',(err)=>{
    if(err){console.log(err)}
    else{console.log('MongoDB connected')}
})

app.use('/user',userRoute);

app.listen(PORT,()=>console.log(`Server Running on PORT ${PORT}`))