import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors"
import schema from './schema/RootSchema.js'
import mongoose from "mongoose";


// initialize global variables
const app = express()
const PORT = 4000;

// setup middleware
app.use(express.json())
app.use(cors())

// connect with MongoDB
mongoose.connect('mongodb+srv://admin:admin123456@cluster0.uappo.mongodb.net/blog').then(()=> console.log('DB Connected!')).catch(e => console.log(e.message))

// initial api end point
app.get('/',(req,res)=>{
    return res.status(200).json({"message": "type /graphql on url to access the GraphQL apis also Graphiql is enabled so you can test it out there :)"})
})


// super charged end point for graphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// listening server 
app.listen(PORT, ()=> console.log(`Alive on http://localhost:${PORT}`))