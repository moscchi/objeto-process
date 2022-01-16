const dotenv = require('dotenv')
const mongoose =require('mongoose');

dotenv.config();

const MONGO = process.env.MONGO || '';
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('Conectado a la base de datos');
    }
})

module.exports = mongoose;