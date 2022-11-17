const fs = require('fs')
const https = require('https')
//const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');

const webhook = require("./service/webhook");
app.use(webhook);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const api = require('./service/api');
app.use(api);

app.use('/', express.static('www'))

// var https_options = {
//     key: fs.readFileSync('C:/webmap/RTKGNSS/keys/private.key'),
//     cert: fs.readFileSync('C:/webmap/RTKGNSS/keys/public.crt'),
//     ca: fs.readFileSync('C:/webmap/RTKGNSS/keys/intermediate.crt')
// };


// var server = https.createServer(https_options, app);
// var port = process.env.PORT || 3000;
// server.listen(port, function () {
//     console.log('listening on port ' + server.address().port);
// });

const port = 3500
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

