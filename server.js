const express = require('express')
const db = require('./db')
const passport = require('./auth')
const personRoutes = require('./Routes/personRoutes')
const menuRoutes = require('./Routes/menuRoutes')
const {jwtAuthMiddleware, generateToken} = require('./jwt')
const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.json())
const PORT = 3001

const locaAuthMiddleware =  passport.authenticate('local', { session: false });

app.use(passport.initialize())

app.get('/',  function (req, res) {
    res.send("hello, Welcome to my Hotel. Clone")
})
// locaAuthMiddleware,
app.use('/person', personRoutes)
app.use('/menu', menuRoutes)

app.listen(PORT, () => {
    console.log('Listening PORT at 3001');

})