const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path')
// const { cloudinary } = require('./cloudinary')
const cors = require('cors');
const { getAllEquipment, getUser } = require('./database.js');


const port = 1337; // Port number

// middlewares

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '2mb'}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'jlfdsfjmjericroe854958409!!',
    store: new MongoStore({ url: 'mongodb+srv://MyLifeOnTheOutside:MyL1f3OnTh3Outs1d3@karinfrontend.foi9f.gcp.mongodb.net/MyLifeOnTheOutside?retryWrites=true&w=majority' })
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use(express.static(path.join(__dirname, '/../build')))

//förhindrar att man kan försöka skicka apirequest utan att vara inloggad
app.use((req, res, next) => {
    const url = req.url
   
    //släpper igenom isAuthenticated anropet men inget annat anrop
   if(url.startsWith('/api') && url != '/api/authenticateUser') {

        if (!req.session.userId){
            res.status(401).end('Sorry, we cannot do that!')
            return
        } 
    }
   next()
})

//get och post requests

app.post('/api/authenticateUser', (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password
    const collection = 'users';
    getUser(userName, collection, dataOrError => {
      
        if(!dataOrError){
           res.send(null)
        }
        else{

            let user = dataOrError[0]
            //TODO fixa hash för password
            if ( user.password === password){
             
                //sätter userID till sessionens userId
                req.session.userId = user._id
                console.log('req.session: ', req.session)
                const response = {
                    userName: user.userName,
                    id: user._id
                }
               
                res.send(response)
            }
            else {
               
                res.send(null)
            }
        }
    })
})

app.post('/api/logOutSession', (req,res)=>{

    req.session.destroy(() => {
        res.send('utloggad')
    })

})

//TODO hämta bara de med rätt sessionId
app.get('/api/allEquipment', (req, res) => {

    const collection = 'equipment'
    // TODO const userId = req.session.userId
    // TODO skicka med userId som props, sök efter objekt med rätt UserId
    getAllEquipment(collection, dataOrError => {
        res.send(dataOrError);
    })
})

//TODO 
// add new equipment, lägger till session id
// app.post('/api/newEquipment', (req, res)=>{
//     const collection = 'equipment'
//     const newEquipment = {...req.body.equipment, userId:req.session.userId}

//     addNewEquipment( newEquipment, collection, dataOrError =>{
//         res.send(dataOrError)
//     })
// })

// app.post(createuser)
// hacka password här

app.listen(port, () => {
   console.log('Web server listening on port ' + port)
})