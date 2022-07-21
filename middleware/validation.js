const expressValidator = require("express-validator");
const passwordValidator = require('password-validator');



const validate = (req, res, next) => {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Error: ", errors)
        res.status(400).json({ errors: "Please send data in the good format" })

    } else {
        next()
    }
}

// middleware pour le format des information pendant l'inscription . a finir 
const validationSignup = [
    expressValidator.body("lastname").exists().isString(),
    expressValidator.body("firstname").exists().isString(),
    expressValidator.body("email").exists().isEmail(),
    expressValidator.body("password").exists().isString().custom(value => {
        const schema = new passwordValidator()

        schema
            .is().min(8)
            .is().max(30)
            .has().uppercase()
            .has().lowercase()
            .has().digits(1)
            .has().not().spaces()


        return schema.validate(value);

    }),
    validate
]

// middleware pour la connection pour le format des information
const validationLogin = [
    expressValidator.body("email").exists().isEmail(),
    expressValidator.body("password").exists().isString(),
    validate
]




module.exports = {

    validationSignup,
    validationLogin
}