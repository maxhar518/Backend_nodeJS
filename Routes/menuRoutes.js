const express = require('express')
const Routes = express.Router()
const menuItem = require('./../models/menu')

Routes.post('/', async (req, res) => {
    try {
        const data = req.body

        const newItem = new menuItem(data)

        const answer = await newItem.save()
        console.log('data Saved');
        res.status(200).json(answer)

    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'Internal Server Error' })
    }
})

Routes.get('/', async (req, res) => {
    try {
        const data = await menuItem.find()
        console.log('menu fetched');
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Internal Server Error" })
    }
})

module.exports = Routes