const { createAnnnonce, updateAnnonce, deleteAnnonce, getAnnonce, findAnnonceByCategory, findByUser, deleteAll, findAnnonceByTitle, testDelete, allAnnonce } = require("../models/annonce")
const { v4: uuidv4 } = require('uuid')



// controller creation annnonce

const controllerCreateAnnonce = async (req, res) => {
    try {
        const user = req.user

        if (user) {
            const newId = uuidv4()
            const annonceBody = req.body


            const annonce = await createAnnnonce({ ...annonceBody, user_Id: user.id, id: newId })

            res.json({ message: `annonce was created`, user, annonce })


        } else {
            res.json({ message: "you can't do that" })
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}


// controller recuperer l'annonce

const controllerFindAnnonce = async (req, res) => {
    try {

        const id = req.params.id
        const annonce = await getAnnonce(id)

        res.json(annonce[0][0])

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}


// controller modifier l'annonce 

const ControllerupdateAnnonce = async (req, res) => {
    try {
        const user = req.user
        if (user) {
            const id = req.params.id
            const newinfo = req.body
            const price = eval(req.body.priceOrigin + "+ 2")
            const prices = price.toString()
            const find = await getAnnonce(id)

            // pour verifier si cest le bonnne annonce
            if (user.id === find[0][0].user_Id) {

                const update = await updateAnnonce(id, { ...newinfo, priceWanted: prices })

                res.json({ message: "annonce is eddit", update })
            } else {
                res.json({ message: "you can't do that" })
            }



        } else {
            res.json({ message: "you cant do that" })

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })

    }
}


// controller supprimer une annonce 
const controllerDeleteAnonnce = async (req, res) => {
    try {
        const user = req.user
        if (user) {
            const id = req.params.id;

            const find = await getAnnonce(id)

            if (user.id === find[0][0].user_Id) {

                const drop = await deleteAnnonce(id)

                res.json({ message: "your annonce is delete" })
            } else {
                res.json({ message: "you can't do that" })
            }


        } else {
            res.json({ message: "you can't do that" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })
    }

}


// controller pour trouver une annonce par category 

const controllerFindByCategory = async (req, res) => {
    try {
        const category = req.body.category

        const annonce = await findAnnonceByCategory(category)

        if (annonce[0]) {
            res.json(annonce[0])
        } else {
            res.json({ message: "annonce doesnt exist" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }
}



// recuperer toutes les annonces de l'utilisateur

const controllerFindAnnonceByUser = async (req, res) => {
    try {
        const user = req.user
        if (user) {

            const annonce = await findByUser(user.id)

            res.json(annonce[0])
        } else {
            res.json({ message: "you can't do that" })
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}


// controller pour effacer toutes les annonces de l'utilisateur 

controllerDeleteAll = async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            // effacer toutes les annnonces de l'utilisateur
            const annonce = await deleteAll(user.id)
            if (annonce[0]) {

                next()
            } else {
                next()
            }


        } else {
            res.json({ message: "you can't do that" })
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

// controller trouver une annonce par titre

const controllerFindByTitle = async (req, res) => {
    try {
        const title = req.params.searchValue
        const tiless = title.split(" ")

        if (tiless.length > 1) {
            // pour qu'il y a les % dans le model
            const titles = `%${tiless[0]}%`
            const titles2 = `%${tiless[1]}%`

            const annonce = await findAnnonceByTitle(titles)
            const annonces = await findAnnonceByTitle(titles2)
            if (annonce[0] && annonces[0]) {

                res.json([annonce[0], annonces[0]])
            } else {
                res.json({ message: "annonce doesnt exist" })
            }

        } else {
            // pour qu'il y a les % dans le model 
            const titles = `%${title}%`
            const annonce = await findAnnonceByTitle(titles)

            if (annonce[0]) {

                res.json([annonce[0]])
            } else {
                res.json({ message: "annonce doesnt exist" })
            }
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }
}

// controller visualiser toutes les annonces


const controllerAllAnnonce = async (req, res) => {
    try {

        const annonce = await allAnnonce()

        if (annonce[0]) {

            const lastAnnonce = annonce[0].filter(annonce => annonce.id !== null)
            // console.log(lastAnnonce)
            res.json(lastAnnonce)
        } else {
            res.json({ message: "annonce doesnt exist" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: "There was a problem" })

    }
}
module.exports = {
    controllerCreateAnnonce,
    controllerFindAnnonce,
    ControllerupdateAnnonce,
    controllerDeleteAnonnce,
    controllerFindByCategory,
    controllerFindAnnonceByUser,
    controllerDeleteAll,
    controllerFindByTitle,
    controllerAllAnnonce
}