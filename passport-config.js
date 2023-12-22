const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user === null) {
            return done(null, false, { message: "No user with that email" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                done(null, user)
            } else {
                done(null, false, { message: "Incorrect password" })
            }
        }
        catch (e) {
            done(e)
        }
    }
    passport.use(new localStrategy({ usernameField: "eamil", }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deSerializeUser((user, done) => {
        return done(getUserById(user.id))
    })
}

module.exports = initialize