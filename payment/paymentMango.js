const express = require('express');
const mangopay = require('mangopay2-nodejs-sdk');

const app=express()
const client_id="myflowerlifetest"
const api=new mangopay({
  clientId:process.env.clientId,
  clientApiKey:process.env.apiKey,
  baseUrl:"https://api.sandbox.mangopay.com/"
})

// app.post(`https://api.sandbox.mangopay.com/v2.01/${client_id}/users/natural`,async(req,res)=>{

// })



var myUser = new api.models.UserLegal({
  Name: 'MangoPay',
  Email: 'info@mangopay.com',
  LegalPersonType: 'BUSINESS',
  LegalRepresentativeFirstName: 'Mango',
  LegalRepresentativeLastName: 'Pay',
  LegalRepresentativeEmail: 'mango@mangopay.com',
  HeadquartersAddress: new api.models.Address({
      AddressLine1: "4101 Reservoir Rd NW",
      AddressLine2: "",
      City: "Washington",
      Region: "District of Columbia",
      PostalCode: "20007",
      Country: "US"
  }),
  LegalRepresentativeBirthday: 1300186358,
  LegalRepresentativeNationality: 'FR',
  LegalRepresentativeCountryOfResidence: 'FR',
  CompanyNumber: 123456789,
  Tag: 'custom tag'
});

api.Users.create(myUser).then(function (myReturnedUser) {
  // Output the created user data to console
  console.log(myUser.Name + ' legal user created at ' + myReturnedUser.CreationDate);
});

/**
*
* Create a user using a hash of properties. Res
* Don't forget to define PersonType
* This example uses callback pattern approach
*
*/
api.Users.create({
  Name: 'MangoPay',
  Email: 'info@mangopay.com',
  LegalPersonType: 'BUSINESS',
  LegalRepresentativeFirstName: 'Mango',
  LegalRepresentativeLastName: 'Pay',
  LegalRepresentativeEmail: 'mango@mangopay.com',
  PersonType: "LEGAL",
  HeadquartersAddress: {
      "AddressLine1": "4101 Reservoir Rd NW",
      "AddressLine2": "",
      "City": "Washington",
      "Region": "District of Columbia",
      "PostalCode": "20007",
      "Country": "US"
  },
  LegalRepresentativeBirthday: 1300186358,
  LegalRepresentativeNationality: 'FR',
  LegalRepresentativeCountryOfResidence: 'FR',
  CompanyNumber: 123456789,
  Tag: 'custom tag'
}, function (myOtherUser) {
  // Output the created user data to console
  console.log(myOtherUser.Name + ' user created at ' + myOtherUser.CreationDate);
});

/**
*
* Create a new natural user with only required values
* Promise style handling of the response
*
*/
api.Users.create({
  PersonType: "NATURAL",
  FirstName: "John",
  LastName: "Smith",
  Birthday: 1300186358,
  Nationality: "FR",
  CountryOfResidence: "GB",
  Email: "john@smith.eu",
}).then(function (response) {
  console.log("Natural user created", response);
});

/**
*
* Fail at creating a new natural user, error caught
* Promise style handling of the response
*
*/
api.Users.create({
  PersonType: "NATURAL",
}).catch(function (error) {
  console.log("Natural user creation failed", error);
});

// mangopay.Users.create({
//   "FirstName": "Victor",
//   "LastName": "Hugo",
//   "Address": "1 rue des Misérables, Paris",
//   "Birthday": 1300186358,
//   "Nationality": "FR",
//   "CountryOfResidence": "FR",
//   "Occupation": "Writer",
//   "IncomeRange": "6",
//   "ProofOfIdentity": null,
//   "ProofOfAddress": null,
//   "PersonType": "NATURAL",
//   "Email": "victor@hugo.com",
//   "Tag": "custom tag",
// }, function(model) {
//   // User created - using callback
// }).then(function(model){
//   // User created - using promise
// });


// var myUser = new api.models.UserLegal({
//   Name: 'MangoPay',
//   Email: 'info@mangopay.com',
//   LegalPersonType: 'BUSINESS',
//   LegalRepresentativeFirstName: 'Mango',
//   LegalRepresentativeLastName: 'Pay',
//   LegalRepresentativeEmail: 'mango@mangopay.com',
//   HeadquartersAddress: new api.models.Address({
//       AddressLine1: "4101 Reservoir Rd NW",
//       AddressLine2: "",
//       City: "Washington",
//       Region: "District of Columbia",
//       PostalCode: "20007",
//       Country: "US"
//   }),
//   LegalRepresentativeBirthday: 1300186358,
//   LegalRepresentativeNationality: 'FR',
//   LegalRepresentativeCountryOfResidence: 'FR',
//   CompanyNumber: 123456789,
//   Tag: 'custom tag'
// });

// api.Users.create(myUser).then(function(){
//   // Output the created user data to console
//   console.log(myUser.Name + ' user created at ' + myUser.CreationDate);
// });

// mangopay.Users.create({
//     "FirstName": "Victor",
//     "LastName": "Hugo",
//     "Address": "1 rue des Misérables, Paris",
//     "Birthday": 1300186358,
//     "Nationality": "FR",
//     "CountryOfResidence": "FR",
//     "Occupation": "Writer",
//     "IncomeRange": "6",
//     "ProofOfIdentity": null,
//     "ProofOfAddress": null,
//     "PersonType": "NATURAL",
//     "Email": "victor@hugo.com",
//     "Tag": "custom tag",
//   }, function(model) {
//     // User created - using callback
//   }).then(function(model){
//     // User created - using promise
//   });

// api.Service.method("/mango" , function(data, response, err){
//   // Callback method
// })

// api.Service.method("/man").then(function(data) {
//   // Promise function called
// }, function(error) {
//   //exception
// })

// api.Transactions.getAll({
//   parameters: {
//       // Pagination
//       per_page: 2,
//       page: 2,

//       // Filters
//       BeforeDate: 1414000367,
//       AfterDate: 1414000367,
//       Nature: REGULAR,
//       Status: FAILED,
//       Type: TRANSFER
//   }
// });