
const mongoose = require ('mongoose')

const URL_MONGO = 'mongodb+srv://fdobzmtz03:ad57400418-@cluster0-bllim.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(URL_MONGO,{useNewUrlParser: true },(err)=>{
    if (!err) console.log('Conexión exitosa');
});


const Schema = mongoose.Schema;

const KillerSchema = new Schema({
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


const Killer = mongoose.model('killer',KillerSchema);

module.exports = {Killer}