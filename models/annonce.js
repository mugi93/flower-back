const db = require("../db")

const date = new Date()


// creation d'une annonce POST

const createAnnnonce = async ({
    id,
    category,
    delivery,
    flowerPot,
    validity,
    title,
    stock,
    priceOrigin,
    priceWanted,
    description,
    photoA,
    photoB,
    photoC,
    user_Id
}) => {
    return db
        .promise()
        .query("INSERT INTO annonce(id,createdAt,category,validity,delivery,flowerPot,title,stock,priceOrigin,priceWanted,description,photoA,photoB,photoC,user_Id) VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            id,
            date,
            category,
            validity,
            delivery,
            flowerPot,
            title,
            stock,
            priceOrigin,
            priceWanted,
            description,
            photoA,
            photoB,
            photoC,
            user_Id
        ]

        );
}


// recuperer l'annonce GET

const getAnnonce = async (id) => {
    return db
        .promise()
        .query(
            "SELECT * FROM annonce RIGHT JOIN user ON annonce.user_Id=user.id WHERE annonce.id=?", [id]
        );

}

// modifier une  annonce PATCH
const updateAnnonce = async (
    id, newAnnonce
) => {

    return db
        .promise()
        .query(
            "UPDATE annonce SET ? WHERE id=?", [
            newAnnonce,
            id

        ]
        );
}


// supprimer une annonce DELETE
const deleteAnnonce = async (id) => {
    console.log("id delete", id)
    return db
        .promise()
        .query("DELETE FROM annonce WHERE id=?", [id]);
}


// trouver une annonce avec son titre

const findAnnonceByTitle = async (title) => {
    return db
        .promise()
        .query("SELECT * FROM user LEFT JOIN annonce ON user.id=annonce.user_Id WHERE lower(annonce.title) LIKE ?", [title])

}

// trouver une annonce avec sa categorie , pas fini
const findAnnonceByCategory = async (category) => {
    return db
        .promise()
        .query("SELECT * FROM annonce WHERE category=?", [category])
}

// recuperer toutes les annonce de l'utilisateur
const findByUser = async (user_Id) => {
    return db
        .promise()
        .query("SELECT * FROM user RIGHT JOIN annonce ON user.id=annonce.user_Id WHERE user.id=?", [user_Id])
}


// supprimer toutes les annonces de l'utilisateur 
const deleteAll = async (user_Id) => {
    return db
        .promise()
        .query("DELETE FROM annonce WHERE user_Id=?", [user_Id])

}


// toutes les annonces de la base de donnes 
const allAnnonce = async () => {
    return db
        .promise()
        .query("SELECT * FROM user LEFT JOIN annonce ON  user.id = annonce.user_Id ORDER BY createdAt DESC")
    // .query("SELECT * FROM annonce ORDER BY createdAT")
}


module.exports = {
    createAnnnonce,
    updateAnnonce,
    getAnnonce,
    deleteAnnonce,
    findAnnonceByTitle,
    findAnnonceByCategory,
    findByUser,
    deleteAll,
    // testDelete,
    allAnnonce
}