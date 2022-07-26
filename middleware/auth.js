const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const { getUser, findByEmail, deleteVerify } = require("../models/user")




// middleware pour verifier si le email existe 
const continueIfFindEmail = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await findByEmail(email)

        if (user[0][0]) {
            // condition pour verifier si l'utilisateur a cliquer sur le lien pendant l'inscription avec le verify
            if (user[0][0].verify == true) {
                req.user = user[0][0]
                next()
            } else {
                // si il n'a pas confirmé son inscription supprimer son compte 
                await deleteVerify()
                res.status(400).json({ errorMessage: "User was not found" })
            }
        } else {
            res.status(400).json({ errorMessage: "User was not found" })
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }
}

// middleware pour verifier si le mail est le bon 
const findEmail = async (req, res, next) => {
    try {
        const email = req.body.email

        const user = await findByEmail(email)
        if (user[0][0]) {
            // creation d'un token pour la duree du lien envoyer par mail
            const token = jwt.sign(
                {
                    id: user[0][0].id
                }, process.env.JWT_SECRET,
                {
                    expiresIn: 60 * 60
                })
            req.token = token
            req.user = user[0][0]
            next()
        } else {
            res.status(400).json({ errorMessage: "User was not found" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }
}

// verification si le token est le bon (pour voir si la personne est bien connecté)
const verifyToken = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1]

        const result = jwt.verify(token, process.env.JWT_SECRET)



        if (result.id) {
            const user = await getUser(result.id)

            req.user = user[0][0]
            next()
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(401).json({ message: "You don't have acces to this information" })
    }
}

// verifier si le email existe deja 

const dontContinueIfFindEmail = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await findByEmail(email)

        if (user[0][0]) {
            if (user[0][0].verify == true) {

                res.json("you already have a account")
            } else {
                await deleteVerify()
                next()
            }
        } else {
            next()
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }
}

// pour verifier si le lien du mail a expiré
const tokenEmail = async (req, res, next) => {
    try {

        const token = req.query.token
        const result = jwt.verify(token, process.env.JWT_SECRET)



        if (result) {
            const user = await getUser(result.id)
            req.user = user[0][0]
            next()
        }
    } catch (error) {
        next()

    }
}
// pour verifier si le lien du mail a expiré
const tokenPassword = async (req, res, next) => {
    try {

        const token = req.query.token
        const result = jwt.verify(token, process.env.JWT_SECRET)



        if (result) {
            const user = await getUser(result.id)
            if (user[0][0]) {
                res.redirect(`${process.env.REACT_APP_API_BASE_URL}passwordReset/${user[0][0].id}`)
            } else {
                res.json({ message: "votre mail n'est pas dans notre base données" })
            }

        } else {
            res.redirect(`${process.env.REACT_APP_API_BASE_URL}expiremail`)

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }

}


module.exports = {
    continueIfFindEmail,
    verifyToken,
    dontContinueIfFindEmail,
    findEmail,
    tokenEmail,
    tokenPassword
}