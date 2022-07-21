const { createOrder, deleteOrder, getOrder } = require("../models/order")
const { v4: uuidv4 } = require('uuid')
const { getAnnonce } = require("../models/annonce")
const { nextTick } = require("process")
const mangopay = require('mangopay2-nodejs-sdk');
const axios = require("axios")

const client_id= process.env.clientId
const apiKey=process.env.apiKey


const createOrders = async (req, res) => {
    try {
        const user = req.user
        
        if (user) {
            
            const order = req.body
            const idUnique = uuidv4()
            
            const idAnnonce = req.params.id
            const userId = req.user.id
           
            const createOrde = await createOrder({ ...order, user_Id: userId, annonce_Id: idAnnonce, id: idUnique })
            // if (createOrde) {
            //     const annonce = await getAnnonce(id)
                
            //     console.log(annonce[0][0])
            //     req.annonce=annonce[0][0]
                
            // }else{
            //     res.status(500).json({ message: "There was a problem" })
            // }
           
               res.json("kek") 
            

            
        } else {
            res.json({ message: "connectez-vous" })
        }

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}



const deleteOrders = async (req, res) => {
    try {

        const user = req.user
        const drop = await deleteOrder(user.id)
        res.json("your order is delete")
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "there was an error while treating the request" })
    }

}


const findOrders = async (req, res) => {
    try {
        const user = req.user
        const userOrder = await getOrder(user.id)
        res.json({ message: "find order", order })
    } catch (error) {
        res.status(500).json({ message: "there was an error while treating the request" })
    }
}

// test mango pay 

// pour cree un utilisateur dans mangopay
const createUser = async (req, res) => {
    try {
        const user = req.user
        const body =req.body
        console.log(body)
        if (body) {
            const test = await axios.post(`https://api.sandbox.mangopay.com/v2.01/${client_id}/users/natural`,body,{ auth: { username:client_id,password:apiKey  } })
            
            
            if(test.data){
            
               res.status(200).json(test.data)
            }

            
        } 

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}
// creer un portefeuille electronique pour mango pay
const createWallet =async (req, res) => {
    try {
        const user = req.user
        const body =req.body
        console.log(body)
        if (body) {
            const test = await axios.post(`https://api.sandbox.mangopay.com/v2.01/${client_id}/wallets`,body,{ auth: { username:client_id,password:apiKey} })
            
            
            if(test.data){
            
                res.status(200).json(test.data)
             }
 

            
        } 

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

// ajouter les donnes bancaire a l'utilisateur
const createIban= async (req, res) => {
    try {
        
        const body =req.body
        // id de l'utilisateur de mango pay
        const id =req.body.id
        
        if (body) {
            const test = await axios.post(`https://api.sandbox.mangopay.com/v2.01/${client_id}/users/${id}/bankaccounts/iban`,body,{ auth: { username:client_id,password:apiKey  } })
            
            
            if(test.data){
            
                res.status(200).json(test.data)
             }
 
            }
            
        

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}
// creation de kyc
const createKyc=async (req, res) => {
    try {
        
        const body =req.body
        // id de l'utilisateur de mango pay
        const id =req.body.id
        
        if (body) {
            const test = await axios.post(`https://api.sandbox.mangopay.com/v2.01/${client_id}/users/${id}/kyc/documents/`,body,{ auth: { username:client_id,password:apiKey  } })
            
            
            if(test.data){
            
                res.status(200).json(test.data)
             }
 

            
        } 

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}
// envoyer le justificatif
const sendKyc= async (req, res) => {
    try {
        
        const body =req.body
        // id de l'utilisateur de mango pay
        const id =req.body.id
        // id du kyc de l'utilisateur
        const kycId=req.body.kycId
        
        if (body) {
            const test = await axios.post(`https://api.sandbox.mangopay.com/v2.01/${client_id}/users/${id}/kyc/documents/${kycId}/pages/`,body,{ auth: { username:client_id,password:apiKey  } })
            
            
            if(test.data){
            
                res.status(200).json(test.data)
             }
 

            
        } 

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}
// envoyer le document en validation
const validateKyc=async (req, res) => {
    try {
        
        const body =req.body
        // id de l'utilisateur de mango pay
        const id =req.body.id
        // id du kyc de l'utilisateur
        const kycId=req.body.kycId
        
        if (body) {
            const test = await axios.put(`https://api.sandbox.mangopay.com/v2.01/${client_id}/users/${id}/kyc/documents/${kycId}`,body,{ auth: { username:client_id,password:apiKey  } })
            
            
            if(test.data){
            
                res.status(200).json(test.data)
             }
 

            
        } 

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

module.exports = {
    findOrders,
    deleteOrders,
    createOrders,
    createUser,
    createWallet,
    createIban,
    createKyc,
    sendKyc,
    validateKyc
}
