const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
  const storesCollection = client.db("automotivesDB").collection("stores")
 
  // get method used 
  app.get("/categories",async(req,res)=>{
    const allBrands = categoryCollection.find();
    const result = await allBrands.toArray();
    res.send(result)
  })

//  method category data get


app.get("/categories/:id", async(req,res)=>{
   const id = req.params.id;
   const query = {_id : new ObjectId(id)};
   const category = await categoryCollection.findOne(query)
   const filter = {category: category.category}
   const  result = await allCategoryCollection.find(filter).toArray()
   res.send(result)
})



// get data 
app.get("/allCategories/:id",async(req,res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await allCategoryCollection.findOne(query)
  res.send(result)
})



// Update Product
app.put("/allCategories/:id",async(req,res)=>{
    const id = req.params.id;
    const product = req.body;
    const filter = {_id : new ObjectId(id)};
    const options = { upsert: true };
    const updateProduct ={
      $set:{
        name: product?.name,
        photo: product?.photo,
        category: product?.category,
        types: product?.types,
        price: product?.price,
        description: product?.description,
        rating: product?.rating

      }
    }

    const result = await allCategoryCollection.updateOne(filter,updateProduct,options)
    res.send(result)
})





 // Post Method use 

 app.post("/allCategories",async(req,res)=>{
   const newProduct = req.body;
   const result = await allCategoryCollection.insertOne(newProduct)
   res.send(result)
 })


 // get Method Use Add to Cart 
app.get("/stores",async(req,res)=>{
    const cursor = storesCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})



  // Post Method Use Add to Cart 
  app.post("/stores",async(req,res)=>{
    const productStore = req.body ;
    const result = await storesCollection.insertOne(productStore)
    res.send(result)
  })



  // delete method use Add to cart
  app.delete("/stores/:id",async(req,res)=>{
     const  id = req.params.id;
     const query = {_id : new ObjectId(id)};
     const result = await storesCollection.deleteOne(query);
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