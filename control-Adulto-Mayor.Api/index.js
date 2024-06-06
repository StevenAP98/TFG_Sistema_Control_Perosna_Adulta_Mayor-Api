const express = require('express');
const app = express();
const apiRoutes = require('./apiRoutes.js');

var cors = require('cors');
require(`dotenv`);

const frontURL = process.env.API_URL;

const allowedOrigins = ['http://localhost:4000', frontURL];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));


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
