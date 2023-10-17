const express = require('express');
const cors = require('cors');
const app = express() ;
const port = process.env.PORT || 5000 ;


// middle Ware 
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
 res.send("Automotive Server Side !!!")
})

app.listen(port,()=>{
  console.log(`Server side running ${port}`);
})