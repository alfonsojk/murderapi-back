const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const PORT = 3000

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());



app.get('/',(req,res)=>{
    res.send({message:'Server on C:'})
});

//Create Esquema
app.post('/create/esquema',(req,res) => {
   const {name,alias,first_appearance, psycho_pathology,creation_year,survivor_victims,favorite_weapon, actor, alive, gender, inspired_by_true_story } = req.body; 
   const newLista = Lista({
       name:"String",
       alias:"String",
       first_appearance:"String",
       psycho_pathology:"String",
       creation_year:"String",
       survivor_victims:"String",
       favorite_weapon:"String",
       actor:"String",
       alive:Boolean,
       gender:"String",
       inspired_by_true_story:Boolean,
       
   });
   newesquema.save((err,pelicula)=>{
       err 
       ? res.status(409).send(err) 
       : res.status(201).send(esquema)
   });
});

app.get('/all/peliculas',(req,res) => {
    Pelicula.find().exec()
        .then(peliculas => res.send(peliculas))
        .catch(err => res.status(409).send(err))
});

app.get('/pelicula/:id',(req,res)=> {
    const {id} = req.params;
    Pelicula.findById(id).exec()
        .then(pelicula => pelicula ? res.send(pelicula) : res.status(404).send({message:'Pelicula not found'}))
        .catch(err => res.status(409).send(err))
});

app.put('/pelicula/:id',(req,res) => {
    const {id} = req.params;
    Pelicula.findByIdAndUpdate(id,{$set:req.body},{new:true}).exec()
        .then(pelicula => res.send(pelicula))
        .catch(err => res.status(409).send(err))
});


app.post('/add/director/:idPelicula',(req,res) => {
    const {idPelicula} = req.params;
    Pelicula.findByIdAndUpdate(idPelicula,{$push: {directores:[req.body]}},{new:true}).exec()
        .then(pelicula => res.status(201).send(pelicula))
        .catch(err => res.status(409).send(err))
});


app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`);
});