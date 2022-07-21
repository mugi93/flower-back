
const db = require("../db")

// creation d'un  utilisateur 
const create = async ({
    id,
    email,
    password,
    picture,
    firstname,
    lastname,
    address,
    cp,
    country,
    phone,
    city,
}) => {
    return db
        .promise()
        .query(
            "INSERT INTO user (id,email, password, picture, firstname, lastname, address, cp, country, phone, city) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [
                id,
                email,
                password,
                picture,
                firstname,
                lastname,
                address,
                cp,
                country,
                phone,
                city,


            ]
        );
};
// login pour se connecter trouver l'email de l'utilisateur 
const findByEmail = async (
    email) => {
    return db
        .promise()
        .query(
            "SELECT * FROM user WHERE email=?",
            [email]
        );
}


// trouver un utilisateur 
const getUser = async (id) => {
    return db
        .promise()
        .query(
            "SELECT * FROM user WHERE id=?", [id]
        );

}
// supprimer un utilisateur 

const deleteUser = async (id) => {
    console.log("id delete",id)
    return db
        .promise()
        .query("DELETE FROM user WHERE id=?", [id]);
}

//  modifier un utilisateur 

const updateUser = async (
    id, newInformation
) => {
    console.log("idm",id)
    console.log("newi",newInformation)
    return db
        .promise()
        .query(
            "UPDATE user SET ? WHERE id=?", [
            newInformation,
            id

        ]
        );
}

// changer le mot de passe


const updatePassword = async (
    id, password
) => {
    console.log("idm",id)
    console.log("pass",password)
    return db
        .promise()
        .query(
            "UPDATE user SET ? WHERE id=?", [
            password,
            id
        ]
        );
}

// retrouver le mail de l'utilisateur
 const verifyEmail = async(
     id
 )=>{
     console.log(id)
     return db
     .promise()
     .query("SELECT * FROM user WHERE id=?",[id]
     )
 }
// model pour confirmer l'inscription avec le mail en changeant le verify dans la base de donnees
 const updateVerify=async(id)=>{
     console.log(id)
     return db
     .promise()
     .query("UPDATE user SET verify=? WHERE id=?",[true,id])
 }

// model si l'inscription n'est pas confirmer supprimer l'utilisateur 
const deleteVerify= async()=>{
    
    return db
    .promise()
    .query("DELETE FROM user WHERE verify=?",[false])
}
module.exports = {
    create,
    findByEmail,
    getUser,
    deleteUser,
    updateUser,
    updatePassword,
    verifyEmail,
    deleteVerify,
    verifyEmail,
    updateVerify
}
