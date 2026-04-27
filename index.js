require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const dbConfig = require("./config/dbConfig")

// midddleware
app.use(express.json)
app.use(cors())

// database config
dbConfig()

app.get('/', (req,res)=>{
   res.send("hello world")
   
})

port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
    
})