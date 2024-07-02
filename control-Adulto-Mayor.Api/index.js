require(`dotenv`);
const express = require('express');
const app = express();
var cors = require('cors');
const apiRoutes = require('./apiRoutes.js');

const middleware = require("./utils/middleware.js").decryptReq;

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

app.use((req, res, next) => {
  const referer = req.headers.referer || req.headers.origin;
  const origin = referer ? referer.split('/').slice(0, 3).join('/') : '';
  
  if (allowedOrigins.includes(origin)) {
    req = middleware(req);
    next();
  } else {
    res.status(403).send('Forbidden');
  }
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
