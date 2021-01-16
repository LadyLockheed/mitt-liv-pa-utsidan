const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017';
const dbName = 'MittLivPaUtsidan';
const collectionName = 'equipment';

//Collections:
//User- name, id (genererat av mongodb), password
//Equipment - namn, vikt, notes, kategori, user
//Adventure - name, season, distance , days (dygn)/duration, user date-added, date-starting, date-ending (räkna ut med antalet dygn, behöver ej ha i databasen, kan ränka ut i frontend (se moment.js)), packinglist (array med equipment-id), notes
//eventuellt egen collection för packinglists
 
function get(filter, callback){


MongoClient.connect( url, { useUnifiedTopology : true }, async (error, client)=>{ 

    if(error){
        callback('cant connect to database', error.message)
        console.log(error)
        return;
    }

    const theCollection = client.db(dbName).collection(collectionName); 

    try{
        const cursor = theCollection.find();
        const array = await cursor.toArray();
        callback(array);

    } catch(error){
        console.log('Wrong query, error: ', error.message);
        callback('Wrong query'); 

    } finally{
        client.close();
    }
})
}

function getAllEquipment (callback) {
    
    get({}, callback)
}

module.exports = {
    getAllEquipment
}