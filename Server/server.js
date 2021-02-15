const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path')
// const { cloudinary } = require('./cloudinary')
const cors = require('cors');
const { getAllEquipment, getUser, addNewUser, addNewEquipment, deleteEquipment, editEquipment, addNewAdventure, getAllAdventures, saveAdventureNotes, deleteAdventure } = require('./database.js');

// const port = 1337; // Port number

const port = process.env.PORT || 1337; 
// console.log('Foo: ', process.env.NODE_ENV);
console.log('Foo: ', process.env)  // RÄTT

const bcrypt = require('bcryptjs');
// const { default: EditEquipment } = require('../src/Components/Equipment/EditEquipment.jsx');

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

    //släpper igenom whitelist anropet men inget annat anrop

    const whitelist = ['/api/authenticateUser', '/api/addNewUser']

    //om urlen startar med api och den inte finns med i whitelist
    if (url.startsWith('/api') && !whitelist.includes(url)) {

        if (!req.session.userId) {

            res.status(401).end('Sorry, we cannot do that!')
            return
        }
    }
    next()
})


//log in
app.post('/api/authenticateUser', async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password
    const userArray = await getUser(userName)

    //om den inte hittar användaren skickas inget tillbaka och frontend renderar felmeddelanden
    if (userArray.length < 1) {
        console.log('i authenticateuser, hittar ej användaren ')
        res.send(null)
    }
    else {
        console.log('i authenticateuser, hittade användaren: ')
        //den hittade usern
        let user = userArray[0]

        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        if (passwordIsCorrect) {

            //sätter userID till sessionens userId
            req.session.userId = user._id

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

// log out
app.post('/api/logOutSession', (req, res) => {

    req.session.destroy(() => {
        res.send('utloggad')
    })

})

//add a new user
app.post('/api/addNewUser', async (req, res) => {

    const newUserName = req.body.newUserName;
    const newPassword = req.body.newPassword

    const hashedPassword = await bcrypt.hash(newPassword, 8)

    //kollar om user redan finns
    const userArray = await getUser(newUserName)

    if (userArray.length > 0) {
       
        res.send(null)
        //fail här, (kanske skicka annan statuskod)
        //användaren finns redan
    }
    else {

        const newUser = await addNewUser(newUserName, hashedPassword)
        res.send(newUser)
    }

})

app.get('/api/allEquipment', async (req, res) => {

    const userId = req.session.userId

    const allEquipment = await getAllEquipment(userId)
    res.send(allEquipment);
})

app.get('/api/allAdventures', async (req, res) => {

    const userId = req.session.userId

    const allAdventures = await getAllAdventures(userId)
    res.send(allAdventures);
})

app.post('/api/addNewAdventure', async (req, res) => {

    const userId = req.session.userId
    const newAdventure ={...req.body.newAdventure, userId}
    
    const addedNewAdventure = await addNewAdventure(newAdventure)
    res.send(addedNewAdventure)

})

app.put('/api/saveAdventureNotes', async (req, res)=>{
  
    const notes = req.body.notes
    const adventureId = req.body.adventureId
    
    const savedAdventureNotes = await saveAdventureNotes(notes, adventureId)
    res.send(savedAdventureNotes)
   
})

app.delete('/api/deleteAdventure', async (req,res)=>{

    const adventureId = req.body._id

    const deletedAdventure = await deleteAdventure(adventureId)
    res.send(deletedAdventure)
})

// add equipment
app.post('/api/addNewEquipment', async (req, res) => {

    const newEquipment = req.body.newEquipment
    const newCategory = req.body.newCategory
    const newWeight = req.body.newWeight
    const newInfo = req.body.newInfo
    const userId = req.session.userId
 
    const addedNewEquipment = await addNewEquipment(newEquipment, newCategory, newWeight, newInfo, userId)

    res.send(addedNewEquipment)

})

app.delete('/api/deleteEquipment', async (req, res) => {

    const equipmentId = req.body._id
    const deletedEquipment = await deleteEquipment(equipmentId)

    res.send(deletedEquipment)
})

app.put('/api/editEquipment', async (req, res) => {

    const updatedEquipment = {
        equipment: req.body.updatedEquipment,
        category: req.body.updatedCategory,
        weight: req.body.updatedWeight,
        info: req.body.updatedInfo,
        userId: req.session.userId
    }
    const equipmentId = req.body.equipmentId

    const editedEquipment = await editEquipment(updatedEquipment, equipmentId)
    res.send(editedEquipment)
})

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


app.listen(port, () => {
    console.log('Web server listening on port ' + port)
})