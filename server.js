/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Namandeep Singh Wadhwa Student ID:146466214 Date: May 17,2023
*  Cyclic Link: 
*
********************************************************************************/ 

const express = require('express');
const cors= require('cors');
const path = require('path');
const dotenv = require('dotenv').config({path: "./config/keys.env"});
const bodyParser = require('body-parser');
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

app.use(cors());
// Add support for incoming JSON entities
app.use(bodyParser.json());

app.use(express.json())

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.send("API Listening");
});


// Getting movies by id
app.get("/api/movies/:_id", (req, res) => {
    db.getMovieById(req.params._id)
    .then((data) => { res.status(201).json(data) })
    .catch((err) => { res.status(500).json({error: err}) })
});


//Adding a new movie
app.post("/api/movies", (req, res) => {
    
        db.addNewMovie(req.body)
        .then((data) => { res.status(201).json(data) })
        .catch((err) => { res.status(500).json({error: err}) })
    
});

//Updatating a movie
app.put("/api/movies/:_id",(req,res)=>{
db.updateMovieById(req.body,req.params._id,).
then((data)=>{res.status(201).jason(data)})
.catch((err)=>res.status(500).jsson({error:err}))

})

//Gettting movier by page,perpage and title
app.get("/api/movies", (req, res) => {
    if((!req.query.page || !req.query.perPage)) res.status(500).json({message: "Missing query parameters"})
    else {
        db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
        .then((data) => {
            if(data.length === 0) res.status(204).json({message: "No data returned"});
            else res.status(201).json(data);
        })
        .catch((err) => { res.status(500).json({error: err}) })
    }
});

//Deleting a movie using id
app.delete("/api/movies/:_id", (req, res) => {

    db.deleteMovieById(req.params._id).
    then((data)=>{res.status(201).json(data)})
    .catch((err)=>{res.status(500).json({error:err})})
});

// Initialize the database connection
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
