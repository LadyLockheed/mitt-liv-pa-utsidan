const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path')
// const { cloudinary } = require('./cloudinary')
const cors = require('cors');
const { getAllEquipment, getUser, addNewUser } = require('./database.js');

const port = 1337; // Port number

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));
//middleware session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'jlfdsfjmjericroe854958409!!',
    store: new MongoStore({ url: 'mongodb+srv://MyLifeOnTheOutside:MyL1f3OnTh3Outs1d3@karinfrontend.foi9f.gcp.mongodb.net/MyLifeOnTheOutside?retryWrites=true&w=majority' })
}));
//middleware logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})
app.use(express.static(path.join(__dirname, '/../build')))

//middleware kollar så man inte försöker komma till en sida utan att vara inloggad
app.use((req, res, next) => {

    //current url
    const url = req.url
    console.log('i server.js kollar vilken url: ', url)

    //släpper igenom whitelist anropet men inget annat anrop

    const whitelist = ['/api/authenticateUser', '/api/addNewUser']

    //om urlen startar med api och den inte finns med i whitelist
    if (url.startsWith('/api') && !whitelist.includes(url)) {
        console.log('url:en var inte med på whitelist')
        if (!req.session.userId) {
            console.log('man var inte inloggad')
            res.status(401).end('Sorry, we cannot do that!')
            return
        }
    }
    next()
})



app.post('/api/authenticateUser', async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password
    const collection = 'users';
    const userArray = await getUser(userName, collection)
    console.log('i atuthenticateuser, response: ', userArray)
    //om den inte hittar användaren skickas inget tillbaka och frontend renderar felmeddelanden
    if (userArray.length < 1) {
        console.log('i authenticateuser, hittar ej användaren ')
        res.send(null)
    }
    else {
        console.log('i authenticateuser, hittade användaren: ')
        //den hittade usern
        let user = userArray[0]
        //TODO fixa hash för password
        if (user.password === password) {
            console.log('password stämmer')
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
            console.log('password stämde inte')
            res.send(null)
        }
    }

})

app.post('/api/logOutSession', (req, res) => {

    req.session.destroy(() => {
        res.send('utloggad')
    })

})


app.post('/api/addNewUser', async (req, res) => {

    console.log('i addnewuser, req.body: ', req.body)
    const newUserName = req.body.newUserName;
    const newPassword = req.body.newPassword
    const collection = 'users';

    //kollar om user redan finns
    const userArray = await getUser(newUserName, collection)
    console.log('efter getUser, responsen: ', userArray)
    if (userArray.length > 0) {
        console.log('i ifsats, användaren finns redan')
        res.send(null)
        //fail här, (kanske skicka annan statuskod)
        //användaren finns redan
    }
    else {

        console.log('i else sats användaren finns inte, adda ny user ok')
        const newUser = await addNewUser(newUserName, newPassword, collection)

        res.send(newUser)
    }

})

//TODO hämta bara de med rätt sessionId
app.get('/api/allEquipment', async (req, res) => {
    console.log('server.js, getAllEquipment')
    const collection = 'equipment'
    // TODO const userId = req.session.userId
    // TODO skicka med userId som props, sök efter objekt med rätt UserId
    const allEquipment = await getAllEquipment(collection)
    console.log('server.js, getAllEquipment, response: ', allEquipment)
        res.send(allEquipment); 
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