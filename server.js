const express = require('express');
const bodyParser = require('body-parser');
const {Killer} = require ('./PersonModel')
const PORT = process.env.PORT || 3000 
const cors = require('cors');

const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send({message:'Server on'})
});


// Create
app.post('/sendkiller',(req,res) => {
    const {name,alias,first_appearance, psycho_pathology, creation_year, number_of_victims, notable_victims,favorite_weapon, actor, alive, gender, inspired_by_true_story } = req.body; 
    const newKiller= Killer({
        name,
        alias,
        first_appearance, 
        psycho_pathology, 
        creation_year, 
        number_of_victims, 
        notable_victims, 
        favorite_weapon,
        actor,
        alive,
        gender,
        inspired_by_true_story,
    });
    newKiller.save((err,killer)=>{
        err 
        ? res.status(409).send(err) 
        : res.status(201).send(Killer)
    });
 });
    
// Read
app.get('/killers',(req,res) => {
    Killer.find().exec()
        .then(data => res.send(data))
        .catch(err => res.status(409).send(err))
});

app.get('/killer/:name',(req,res)=> {
    const {name} = req.params;
    Killer.findById(name).exec()
        .then(data => data ? res.send(data) : res.status(404).send({message:'Killer not found'}))
        .catch(err => res.status(409).send(err))
});

//Update
app.put('/killer/name',(req,res) => {
    const {name} = req.params;
    Killer.findByIdAndUpdate(name,{$set:req.body},{new:true}).exec()
        .then(data => res.send(data))
        .catch(err => res.status(409).send(err))
});



app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`);
});
