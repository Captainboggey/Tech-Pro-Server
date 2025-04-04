const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 4000;


app.use(express.json())
app.use(cors());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w6mhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



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



    








    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const teacherDatabase = client.db('TechProDB').collection('Teachers');
    const bookingDatabase =client.db('TechProDB').collection('Bookings')



    app.post('/becomeTeacher',async(req,res)=>{
      const data = req.body;
      const result =await teacherDatabase.insertOne(data);
      res.send(result) 
    })
    // app.get('/becomeTeacher',async(req,res)=>{
     
    //   const cursor = teacherDatabase.find();
    //   const result = await cursor.toArray();
    //   res.send(result)
      
    // })
    app.get('/becomeTeacher',async(req,res)=>{
      let query ={};
      if(req.query?.language){
        query ={language: req.query.language}

      }
      const cursor = teacherDatabase.find(query);
      const result = await cursor.toArray();
      res.send(result)
      console.log(query.language)
    })



    app.get('/becomeTeacher/:id',async(req,res)=>{
      const id = req.params.id;
      const query ={_id: new ObjectId(id)};
      const result = await teacherDatabase.findOne(query)
      res.send(result)
    })

    app.post('/bookings',async(req,res)=>{
      const bookings = req.body;
      const result =await bookingDatabase.insertOne(bookings)
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
  res.send('server is running ')
})

app.listen(port,()=>{
    console.log('server is running on port ',port)
})