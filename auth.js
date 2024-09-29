const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/person')


passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user =await Person.findOne({ username: username })
        if (!user)
            return done(null, false, { message: 'Incorrect Username' })
        const isPasswordMatched = await user.comparePassword(password)
        if (isPasswordMatched) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Incorrect Password' })
        }
        
    } catch (error) {
        return done(error)
    }
}))

module.exports = passport