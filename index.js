const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express() ;
const port = process.env.PORT || 5000 ;


// middle Ware 
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rwemj7d.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  const categoryCollection = client.db("automotivesDB").collection("categories")
  const allCategoryCollection = client.db("automotivesDB").collection("allCategories")
 
  // get method used 
  app.get("/categories",async(req,res)=>{
    const allBrands = categoryCollection.find();
    const result = await allBrands.toArray();
    res.send(result)
  })



 // Post Method use 

 app.post("/allCategories",async(req,res)=>{
   const newProduct = req.body;
   const result = await allCategoryCollection.insertOne(newProduct)
   res.send(result)
 })





  } finally {
    
  }
}
run().catch(console.dir);










app.get("/",(req,res)=>{
 res.send("Automotive Server Side !!!")
})

app.listen(port,()=>{
  console.log(`Server side running ${port}`);
})