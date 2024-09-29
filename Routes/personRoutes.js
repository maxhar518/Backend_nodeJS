const express = require('express')
const Routes = express.Router()
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

Routes.get('/:workType', jwtAuthMiddleware, async (req, res) => {
    try {
        const workType = req.params.workType;

        const allowedWorkTypes = ['chef', 'waiter', 'manager'];
        if (!allowedWorkTypes.includes(workType)) {
            return res.status(404).json({ error: 'Invalid work type' });
        }

        const response = await Person.find({ work: workType });
        console.log('Response Fetched');
        res.status(200).json(response);
    } catch (error) {
        console.error(error); 
        res.status(500).json({error: 'Internal Server Error'});
    }
});


Routes.put('/:id', async (req,res) => {
    try {
       
        const personid = req.params.id
        const updatedpersondata = req.body

        const response = await Person.findByIdAndUpdate(personid, updatedpersondata, {
            new:true,
            runValidators:true
        })

        if(!response){
            return res.status(404).json({err:'Person not Found'})
        }

        console.log('data Updated');
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Internal Server Error" })
    }
})

Routes.delete('/:id', async (req,res) => {
    try {
        const personid = req.params.id
        const response = await Person.findByIdAndDelete(personid)
        if(!response){
            res.status(404).json({err:'Person not found'})
        }
        console.log('Deleted Successfully');
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({err:'Internal Server Error'})
    }
})

Routes.post('/signup', async (req, res) => {
    try {
        const data = req.body

        const newPerson = new Person(data)

        const response = await newPerson.save()
        
        const payload = {
            id: response.id,
            username: response.username
        }
        
        const token = generateToken(payload)
        console.log('Token:', token);
        
        res.status(200).json({response:response, token:token})
        console.log("Successfully Registerd");

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

Routes.post('/login', async (req,res) => {
    try {
        const {username, password} = req.body

        const user = await Person.findOne({username:username})
        if (!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid username or Password"})
        }

        const payload= {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload)
        console.log('Token:', token);

        res.json(token)
        console.log("Successfully Login");
        
    } catch (error) {
        console.log(error);
        res.status(500).json({err:"Internal Server Error"})
    }
})
Routes.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        sconsole.log('Data Fetched');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal Server error' })
    }
})


module.exports = Routes