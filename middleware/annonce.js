const { findAnnonceByTitle } = require("../models/annonce")




// middleware pour verifier si l'annonce existe deja , on a arreté de l'utiliser 

const verifyAnnonce = async (req, res, next) => {
    try {
        const title = req.body.title
        const id = req.user.id

        const annonce = await findAnnonceByTitle(title)
        if (annonce[0][0]) {

            const user_Id = annonce[0][0].user_Id
            
            if (user_Id === id) {
                res.json({ Message: "this annonce exist already" })
            } else {
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





module.exports = {
    verifyAnnonce
}