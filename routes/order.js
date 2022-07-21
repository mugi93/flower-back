const express = require("express")

const { createOrders, findOrders, createWallet, createIban, createUser, createKyc, sendKyc, validateKyc } = require("../controllers/order")
// const { payementcreate } = require("../controllers/payment")
const { verifyToken } = require("../middleware/auth")
const { deleteOrder } = require("../models/order")
const router = express.Router()


// creation d'un order
router.post("/:id", verifyToken, createOrders)

// recupere un order
router.get("/get", verifyToken, findOrders)
// annuler un order
router.delete("/drop", verifyToken, deleteOrder)

// mango pay test route
router.post("/user",createUser)
router.post("/pay",createWallet)
router.post("/iban",createIban)
router.post("/kyc/create",createKyc)
router.post("/kyc/send",sendKyc)
router.put("/kyc/validate",validateKyc)

// test pour paypal
// router.get('/test', (req, res) => res.sendFile(__dirname + "../controllers/index.html"));
// router.get('/cancel', (req, res) => res.send('Cancelled'));



router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route order was not found"
    })
})

module.exports = router
