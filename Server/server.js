const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
// const { cloudinary } = require('./cloudinary')
const cors = require('cors');
const { getAllEquipment, getUser } = require('./database.js');


const port = 1337; // Port number

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '2mb'}));
app.use(cors());

// middlewares
app.use(express.static(path.join(__dirname, '/../build')))
 

// app.get('/api/allUsers', (req, res) => {
//     let collection = 'users'
//     getAllUsers(collection,  dataOrError => {
//         res.send(dataOrError);
//     })
// })
 
app.get('/api/allEquipment', (req, res) => {

    const collection = 'equipment'
    getAllEquipment(collection, dataOrError => {
        res.send(dataOrError);
    })
})

app.post('/api/authenticateUser', (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password
    const collection = 'users';
    getUser(userName, collection, dataOrError => {
      
        if(!dataOrError){
            console.log('hittade ingen med det namnet')
           res.send(null)
        }
        else{

            let user = dataOrError[0]
            //fixa hash för password
            if ( user.password === password){
                console.log('lösenordet stämmer')
                const response = {
                    userName: user.userName,
                    id: user._id
                }
                console.log('response: ', response)
                res.send(response)
            }
            else {
                console.log('lösenordet stämmer inte')
                res.send(null)
            }

        }
     
    })
})


app.listen(port, () => {
   console.log('Web server listening on port ' + port)
})