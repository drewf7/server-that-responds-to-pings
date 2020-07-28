const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const expressPort = (process.env.PORT === undefined) ? 3000 : process.env.PORT

const rateLimit = require('express-rate-limit');

// Trust Nginx Proxy
app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Wouldn't want to respond to too many pings now would we
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // Every 5 min
  max: 100, // No more than 100 connections
  message: 'Rate Limit Exceeded'
})

// Do The Thing
app.use('/*', (req, res, next) => {
    console.log(`Got Ping on "${req.originalUrl}" From "${req.connection.remoteAddress}". Responding with Pong`);
    res.status(200).send("Pong");
});

// Start Express server
server.listen(expressPort, function () {
  console.log('App startup', `env: ${app.get('env')} port: ${expressPort}`);
});