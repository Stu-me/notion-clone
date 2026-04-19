const express = require('express');
const app = express();

const port = 8000;
app.get('/sandy',(req,res)=>{
    res.send("welcome to the server");
})

app.listen(port,()=>{
    console.log("server started");
})