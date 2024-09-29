const mongoose = require('mongoose')

const mongoURL = 'mongodb+srv://mazhar518:mazhar518@atlascluster.gpt1hrj.mongodb.net/hotels'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log('connected to Mongodb Server');
    
})

db.on('error', (err) => {
    console.log('MongoDB Connection error', err);
    
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
    
})

module.exports = db