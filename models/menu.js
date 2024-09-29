const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    taste:{
        type:String,
        required:true,
        enum:['sweet', 'spicy', 'sour']
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default: []
    },
    num_Sales:{
        type: Number,
        default: 0
    }
})
const menuItem = mongoose.model('menuItem', menuItemSchema)

module.exports = menuItem