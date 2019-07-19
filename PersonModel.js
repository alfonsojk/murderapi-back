
const mongoose = require ('mongoose')

const URL_MONGO = 'mongodb+srv://alfonsojk:sacksjk!1@alfonsojk-mdswh.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(URL_MONGO,{ useNewUrlParser: true },(err)=>{
    if (!err) console.log('Conexión exitosa');
});


const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name :String,
    alias:String,
    first_appearance:String,
    psycho_pathology:String,
    creation_year:String,
    survivor_victims:String,
    favorite_weapon:String,
    actor:String,
    alive:Boolean,
    gender:String,
    inspired_by_true_story:Boolean
})


const Person = mongoose.model('person',PersonSchema);

module.exports = {Person}