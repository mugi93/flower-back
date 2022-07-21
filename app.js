const express = require("express");
const cors = require ("cors");
const app = express();
const userRoutes = require("./routes/user");
const anonnceRoutes = require("./routes/annonce")
const orderRoutes=require("./routes/order")






app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin:["http://localhost:3000"]}));



const port = process.env.PORT 


// pour tout ce qui concerne l'utilisateur
app.use("/create",userRoutes)
// pour tout ce qui concerne les annonces
app.use("/annonce",anonnceRoutes)
// pour tout ce qui concerne les commandes
app.use("/order",orderRoutes)

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});





