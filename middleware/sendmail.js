const mailjet = require('node-mailjet')
  .connect(process.env.mailjet, process.env.mailjet2)

// mail pour l'inscription
const sendmail = async (body, token) => {

  console.log(body)

  return mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "myflowerlifeantigaspi@gmail.com",
            "Name": "PlantetFlower"
          },
          "To": [
            {
              "Email": body.email,
              "Name": body.firstname
            }
          ],
          "Subject": "Greetings from Mailjet.",
          "TextPart": "My first Mailjet email",
          // on le dirige vers une route du backend
          "HTMLPart": `<h3>Bonjour ${body.firstname} ,<br/> Bienvenue chez PlantetFlower, afin de finaliser votre inscription merci de cliquer sur le lien suivant: <a href="${process.env.NODE_APP_API_BASE_URL}create/verifyemail?token=${token}">PlantetFlower</a>!</h3><br />`,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    .then((result) => {
      console.log(result.body)

    })
    .catch((err) => {
      console.log(err.statusCode)
      res.json("pas de route")
    })
}

// mail pour mot de passe oublier

const sendmail2 = async (req, res) => {

  const token = req.token

  return mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "myflowerlifeantigaspi@gmail.com",
            "Name": "PlantetFlower"
          },
          "To": [
            {
              "Email": req.user.email,
              "Name": req.user.firstname
            }
          ],
          "Subject": "Greetings from Mailjet.",
          "TextPart": "My first Mailjet email",
          // on le dirige vers une route du backend
          "HTMLPart": `<h3>Bonjour, cliquer sur ce lien pour créer votre nouveau mot de passe <a href="${process.env.NODE_APP_API_BASE_URL}create/pass?token=${token}">Modifier son mot de passe</a>!</h3><br />`,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    .then((result) => {
      console.log(result.body)
      res.json({ message: "go", token })

    })
    .catch((err) => {
      console.log(err.statusCode)
      res.json("pas de route")
    })
}


module.exports = { sendmail, sendmail2 }