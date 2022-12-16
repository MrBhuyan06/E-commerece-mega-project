const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const morgan=require('morgan')

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

//morgan logger
// it basically print information of our api req res in our console
app.use(morgan('tiny'))






module.exports=app