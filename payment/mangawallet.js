const mangopay = require('mangopay2-nodejs-sdk');

// In your app you will define your own set of configurations.
// Check README.md for the full list
const api=new mangopay({
    clientId:process.env.clientId,
    clientApiKey:process.env.apiKey,
    baseUrl:"https://api.sandbox.mangopay.com/"
})

// api.Users.create({
//     PersonType: "NATURAL",
//     FirstName: "John",
//     LastName: "Smith",
//     Birthday: 1300186358,
//     Nationality: "FR",
//     CountryOfResidence: "GB",
//     Email: "john@smith.eu",
// }).then(function (user) {
//     api.Wallets.create({
//         Owners: [ user.Id ],
//         Description: "create wallet - demo",
//         Currency: "EUR",
//     })
//         .then(function (res) {
//             console.log("Wallet successfully created ", res)
//         });
//     })
api.Users.getBankAccounts(128498179, {
    parameters: {
        per_page: 100,
        page: 1,
        active: false
    }
}).then(function(data){
    console.log("Should be zero: " + data.length);
});

api.Users.getBankAccounts(128498179, {
    parameters: {
        per_page: 100,
        page: 1,
        active: true
    }
}).then(function(data){
    console.log("Should be more than one: " + data.length);
});