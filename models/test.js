const db = require("../db")

const dates = Date()


// creation d'une annonce POST

const createAnnnonce = async ({
    id,
    category,
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
}) => {
    return db
        .promise()
        .query("INSERT INTO annonce(id,createdAt,category,delivery,flowerPot,title,stock,priceOrigin,priceWanted,description,photoA,photoB,photoC,user_Id) VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            id,
            date,
            category,
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


const db = require("../db")

const date = Date()

const createOrder = async ({
    id,
    email,
    quantity,
    validatedAt,
    feedbackAsked,
    user_Id,
    annonce_Id
}) => {
    return db
        .promise()
        .query("INSERT INTO order(id,createdAt,email,quantity,validatedAt,feedbackAsked,user_Id,annonce_Id) VALUE(?,?,?,?,?,?,?,?)", [
            id,
            date,
            email,
            quantity,
            validatedAt,
            feedbackAsked,
            user_Id,
            annonce_Id
        ]

        );
}

