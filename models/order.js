const db = require("../db")

const createdAt = Date()


// const createOrder = async ({
//     id,
//     email,
//     quantity,
//     feedbackAsked,
//     user_Id,
//     annonce_Id,
//     validatedAt
// }) => {
//     return db
//         .promise()
//         .query("INSERT INTO order (id,createdAt,email,quantity,validatedAt,feedbackAsked,user_Id,annonce_Id) VALUE(?,?,?,?,?,?,?,?)", [
//             id,
//             date,
//             email,
//             quantity,
//             validatedAt,
//             feedbackAsked,
//             user_Id,
//             annonce_Id
//         ]

//         );
// }




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
        .query("INSERT INTO `order`(id,createdAt,email,quantity,validatedAt,feedbackAsked,user_Id,annonce_Id) VALUE(?,?,?,?,?,?,?,?)", [
            id,
            createdAt,
            email,
            quantity,
            validatedAt,
            feedbackAsked,
            user_Id,
            annonce_Id
        ]

        );
};

// find order
const getOrder = async (id) => {
    return db
        .promise()
        .query(
            "SELECT * FROM `order` WHERE user_Id=?", [id]
        );

}
// delete order 

const deleteOrder = async (id) => {
    return db
        .promise()
        .query("DELETE FROM `order` WHERE user_Id=?", [id]);
}



module.exports = {
    createOrder,
    getOrder,
    deleteOrder
}
