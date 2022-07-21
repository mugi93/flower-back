const jwt = require("jsonwebtoken")
const { create, deleteUser, updateUser, getUser, updatePassword, verifyEmail, deleteVerify, updateVerify } = require("../models/user")
const bcryptjs = require("bcryptjs")
const { v4: uuidv4 } = require('uuid')
const { sendmail } = require("../middleware/sendmail")
const { body } = require("express-validator")

const newId = uuidv4()



// controller pour cree un utilisateur 
const createUSer = async (req, res) => {
    try {

        // id unique
        const uniqueId = uuidv4()

        const password = req.body.password
        const passwordHashed = bcryptjs.hashSync(password)
        const user = await create({
            ...req.body,
            password: passwordHashed, id: uniqueId
        });
        // token pour la durer du lien
        const token = jwt.sign(
            {
                id: uniqueId
            }, process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60
            })

        if (user) {
            const body = req.body
            console.log(body)
            // envoie du mail
            const mail = await sendmail(body, token)
        }


        res.json({ message: `user was created`, user })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

// controller pour la connexion
const login = async (req, res) => {
    try {

        const user = req.user
        if (user.verify == true) {
            const password = bcryptjs.compareSync(req.body.password, user.password)
            if (password) {
                // creation du token pour l'authentification
                const token = jwt.sign(
                    {
                        id: user.id
                    }, process.env.JWT_SECRET,
                    {
                        expiresIn: 60 * 60
                    })
                console.log(token)
                res.json({ message: "You're now connected ", token, user })


            } else {
                res.status(401).json({ message: "login failed" })
            }

        } else {
            res.status(401).json({ message: "you are not sign yet" })
        }

    } catch (err) {
        console.log("error: ", err)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}
// controller pour supprimer son compte
const deleteUserProfil = async (req, res) => {
    try {
        const id = req.user.id;
        const drop = await deleteUser(id)

        res.json("your profil is delete")

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })
    }

}
// controller pour modifer son profil
const updateUserProfil = async (req, res) => {
    try {
        const id = req.user.id

        const newIformation = req.body
        // condition si on modifie le mot de passe en meme temps 
        if (req.body.password) {

            const password = req.body.password

            const passwordHashed = bcryptjs.hashSync(password)

            const update = await updateUser(id, { ...newIformation, password: passwordHashed })

            res.json({ message: "user is eddit", update })

        } else {
            const update = await updateUser(id, { ...newIformation })

            res.json({ message: "user is eddit", update })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })
    }
}
// controller pour trouver le profil de l'utilisateur 
const findUser = async (req, res) => {
    try {
        const user = req.user
        res.json({ message: "find user", user })
    } catch (error) {
        res.status(500).json({ message: "there was an error while treating the request" })
    }
}

// controller trouver profil utilisateur sans qu'on est connecté 
const findUserById = async (req, res) => {
    try {
        const id = req.params.id

        const user = await getUser(id)

        res.json(user[0][0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })

    }
}
// controller pour modifier son mot de passe dans le profil
const updatePasswordProfil = async (req, res) => {
    try {
        
        const id = req.user.id
        
        const password = req.body.password
        
        const passwordHashed = bcryptjs.hashSync(password)


        const update = await updateUser(id, { password: passwordHashed })

        res.json({ message: "password is eddit" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })
    }
}

// controller pour apres qu'on a cliqué sur lien pour l'inscription 
const verifymail = async (req, res) => {
    try {
        const user = req.user
        if (user) {
            // pour confirmer son inscription en changeant verify par true
            await updateVerify(user.id)
            res.redirect(`${process.env.REACT_APP_API_BASE_URL}mail`)
        } else {
            // pour supprimer son compte non confirmer
            await deleteVerify()
            res.redirect(`${process.env.REACT_APP_API_BASE_URL}expiremail`)
        }


    } catch (error) {
        console.error(error)
        res.json({ message: "problème" })

    }

}
// apres qu'on cliqué sur lien pour mot de passe oublié
const resetPassword = async (req, res) => {
    try {

        const id = req.params.user
        const password = req.body.password

        const passwordHashed = bcryptjs.hashSync(password)



        if (id && passwordHashed) {
            const update = await updatePassword(id, { password: passwordHashed })
            res.json("password reset")

        } else {
            res.json("lien expiré")
        }


    } catch (error) {
        console.error(error)
        res.json({ message: "probleme" })

    }

}
// pour verifier si le mot de passe actuel est bon 
const confirmPassword = async (req, res) => {
    try {

        const user = req.user

        const password = bcryptjs.compareSync(req.body.password, user.password)
        if (password) {

            res.json({ message: "You're now connected " })


        } else {
            res.json({ message: "login failed" })
        }

    } catch (error) {
        console.error(error)
        res.json({ message: "probleme" })

    }

}

module.exports = {
    login,
    createUSer,
    findUser,
    updateUserProfil,
    deleteUserProfil,
    findUserById,
    updatePasswordProfil,
    verifymail,
    resetPassword,
    confirmPassword
}





