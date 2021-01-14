const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
// const { cloudinary } = require('./cloudinary')
const cors = require('cors');
const { getAllEquipment } = require('./database.js');



const port = 1337; // Port number

console.log('i server.js')

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '2mb'}));
app.use(cors());

// middlewares
app.use(express.static(path.join(__dirname, '/../build')))
 
 
app.get('/api/allEquipment', (req, res) => {

    getAllEquipment(dataOrError => {
        res.send(dataOrError);
    })
})


// app.get('/', (request,response) => {
//    response.send('The cake is a lie')
// })
 
app.listen(port, () => {
   console.log('Web server listening on port ' + port)
})