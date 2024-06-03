const express = require('express');
const app = express();
const apiRoutes = require('./apiRoutes.js');

var cors = require('cors')
app.use(cors({origin:"*"})) // Use this after the variable declaration

// app.use(function(req, res, next){
//   const apiKey=req.get("x-api-key");

//   if(apiKey=="1234"){
//     next()

//   }else{
//     res.status(401).send("unauthorized")
//   }
// })

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
