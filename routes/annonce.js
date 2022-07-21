const express = require("express")
const { controllerCreateAnnonce, controllerFindAnnonce, ControllerupdateAnnonce, controllerDeleteAnonnce, controllerFindByCategory, controllerFindAnnonceByUser, controllerFindByTitle, controllerAllAnnonce } = require("../controllers/annnonce")
const { verifyAnnonce } = require("../middleware/annonce")
const { verifyToken } = require("../middleware/auth")
const router = express.Router()



// route pour créer une annonce
router.post("/", verifyToken, controllerCreateAnnonce)
// route pour modifier une annonce
router.patch("/update/:id", verifyToken, ControllerupdateAnnonce)
// route pour effacer une annonce
router.delete("/drop/:id", verifyToken, controllerDeleteAnonnce)
// route pour trouver une annonce 
router.get("/find/:id", controllerFindAnnonce)
// route pour trouver une annonce par categorie
router.get("/findcategory", controllerFindByCategory)
// route pour trouver une annonce par titre 
router.get("/title/:searchValue", controllerFindByTitle)
// route pour trouver toutes les annonces d'un utilisateur 
router.get("/get", verifyToken, controllerFindAnnonceByUser)
// route pour  les derniere annnonce 
router.get("/allannonce", controllerAllAnnonce)


router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router