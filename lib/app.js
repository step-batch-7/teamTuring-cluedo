const express = require('express');
const staticHandlers = require('../handlers/handleStaticRequests');
const app = express();
app.use(express.static('./public'));
app.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
module.exports = app;
