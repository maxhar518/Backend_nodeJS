const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required: true
    },
    username:{
        required:true,
        type:String
        // unique:true
    },
    password:{
        type:String,
        required:true
    }
})
personSchema.pre('save', async function(next){
    const Person  = this
    if(!Person.isModified('password')) return next()
        try {
            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(Person.password, salt)

            Person.password = hashedPassword
            next()
        } catch (error) {
            return error
        }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatched = await bcrypt.compare(candidatePassword, this.password)
        return isMatched
    } catch (error) {
        throw error
    }
}
const Person = mongoose.model('Person', personSchema)  //Model
module.exports = Person