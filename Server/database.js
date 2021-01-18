const {MongoClient} = require('mongodb')
// const url = 'mongodb://localhost:27017';

// const dbName = 'MittLivPaUtsidan';
const dbName = 'MyLifeOnTheOutside';
// const url='mongodb+srv://berrasBoatsDatabase:berrasBoatsServerside@karinfrontend.foi9f.gcp.mongodb.net/berrasBoatsDatabase?retryWrites=true&w=majority'
const url = 'mongodb+srv://MyLifeOnTheOutside:MyL1f3OnTh3Outs1d3@karinfrontend.foi9f.gcp.mongodb.net/MyLifeOnTheOutside?retryWrites=true&w=majority'

//Collections:
//User- name, id (genererat av mongodb), password
//Equipment - namn, vikt, notes, kategori, user
//Adventure - name, season, distance , days (dygn)/duration, user date-added, date-starting, date-ending (räkna ut med antalet dygn, behöver ej ha i databasen, kan ränka ut i frontend (se moment.js)), packinglist (array med equipment-id), notes
//eventuellt egen collection för packinglists
 
function get(collection, callback){
 
    // console.log(collection)
MongoClient.connect( url, { useUnifiedTopology : true }, async (error, client)=>{ 

    if(error){
        callback('cant connect to database', error.message)
        console.log(error)
        return;
    }

    const theCollection = client.db(dbName).collection(collection); 

    try{
        const cursor = theCollection.find();
        const array = await cursor.toArray();
        callback(array);

    } catch(error){
        console.log('Fel query, error: ', error.message);
        callback('Fel query'); 

    } finally{
        client.close();
    }
})
}

function getAllEquipment (collection, callback) {
    
    get(collection, callback)
}


function getAllUsers (collection, callback) {
    
    get(collection, callback)
}

module.exports = {
    getAllEquipment,
    getAllUsers
}