const express = require('express');
const bodyParser = require('body-parser');
const {Person} = require ('./PersonModel')
const PORT =  process.env.PORT
const cors = require('cors');

const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send({message:'Server on'})
});


// Create
app.post('/create/person',(req,res) => {
    const {name,alias,first_appearance, psycho_pathology, creation_year, number_of_victims, notable_victims,favorite_weapon, actor, alive, gender, inspired_by_true_story } = req.body; 
    const newPerson= Person({
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
    newPerson.save((err,person)=>{
        err 
        ? res.status(409).send(err) 
        : res.status(201).send(person)
    });
 });
    
// Read
app.get('/all/person',(req,res) => {
    Person.find().exec()
        .then(data => res.send(data))
        .catch(err => res.status(409).send(err))
});

app.get('/person/:id',(req,res)=> {
    const {id} = req.params;
    Person.findById(id).exec()
        .then(data => data ? res.send(data) : res.status(404).send({message:'Person not found'}))
        .catch(err => res.status(409).send(err))
});

//Update
app.put('/person/:id',(req,res) => {
    const {id} = req.params;
    Person.findByIdAndUpdate(id,{$set:req.body},{new:true}).exec()
        .then(data => res.send(data))
        .catch(err => res.status(409).send(err))
});



app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`);
});