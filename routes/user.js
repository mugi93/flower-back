const express = require("express")
const { controllerDeleteAll } = require("../controllers/annnonce")
const router = express.Router()
const { createUSer, login, findUser, deleteUserProfil, updateUserProfil, findUserById, updatePasswordProfil, verifymail, resetPassword, confirmPassword } = require("../controllers/user")
const { continueIfFindEmail, verifyToken, dontContinueIfFindEmail, findEmail, tokenEmail, tokenPassword } = require("../middleware/auth")
const { sendmail2 } = require("../middleware/sendmail")
const { validationSignup, validationLogin } = require("../middleware/validation")







// route pour creer un utilisateur et pour envoyer un mail pour la confirmation
router.post("/", dontContinueIfFindEmail, validationSignup, createUSer)
// route apres avoir cliqué sur le lien reçus par mail pour l'inscription
router.get("/verifyemail",tokenEmail,verifymail)

// route pour se connecter 
router.post("/login", continueIfFindEmail, validationLogin, login)

// route pour mot de passe oublier et envoie un mail a la personne 
router.post("/verify", findEmail,sendmail2)
// route apres avoir cliqué sur le lien recu par mail pour le mot de passe
router.get("/pass",tokenPassword)
// route pour le nouveau mot de passe de mot de passe oublier
router.post("/resetpassword/:user",resetPassword)

// route pour qu'un utilisateur voit son profil
router.get("/find", verifyToken, findUser)
// route pour voir le profil d'une annonce
router.get("/findId/:id", findUserById)
// route pour supprimer son compte
router.delete("/drop", verifyToken, controllerDeleteAll, deleteUserProfil)
// route pour modifier que un utilisateur modifie  son profil 
router.patch("/update", verifyToken, updateUserProfil)

// route pour verifier le mot de passe actuel
router.post("/modify/pass",verifyToken,confirmPassword)
// modifier son mont de passe 
router.patch("/change",verifyToken, updatePasswordProfil)




router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router