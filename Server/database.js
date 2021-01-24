const { MongoClient, ObjectID } = require('mongodb')

const dbName = 'MyLifeOnTheOutside';

const url = 'mongodb+srv://MyLifeOnTheOutside:MyL1f3OnTh3Outs1d3@karinfrontend.foi9f.gcp.mongodb.net/MyLifeOnTheOutside?retryWrites=true&w=majority'

//Collections:
//User- name, id (genererat av mongodb), password
//Equipment - namn, vikt, notes, kategori, user
//Adventure - name, season, distance , days (dygn)/duration, user date-added, date-starting, date-ending (räkna ut med antalet dygn, behöver ej ha i databasen, kan ränka ut i frontend (se moment.js)), packinglist (array med equipment-id), notes
//eventuellt egen collection för packinglists

async function get(filter, collection) {

    let client;
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true })
    }
    catch {
        console.log('Could not connect to mongodb ', error.message);
        throw new Error('Could not connect to mongodb')
    }

    const theCollection = client.db(dbName).collection(collection);

    try {
        const cursor = theCollection.find(filter).sort({_id:-1});
        const array = await cursor.toArray();
        return array

    } catch (error) {
        console.log('Fel query, error: ', error.message);
        throw new Error('Fel query')

    } finally {
        client.close();
    }

}


async function post(payload, collection) {
   
    let client;
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true })
    }
    catch {
        console.log('Could not connect to mongodb ', error.message);
        throw new Error('Could not connect to mongodb')
    }

    const theCollection = client.db(dbName).collection(collection);

    try {
        const result = await theCollection.insertOne(payload);
       
        return result.ops

    } catch (error) {
        console.log('Fel query, error: ', error.message);
        throw new Error('Fel query')

    } finally {
        client.close();
    }

}

async function deleteItem(payload, collection) {
   
    let client;
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true })
    }
    catch {
        console.log('Could not connect to mongodb ', error.message);
        throw new Error('Could not connect to mongodb')
    }

    const theCollection = client.db(dbName).collection(collection);

    try {
        const result = await theCollection.deleteOne(payload);
       
        return result.ops

    } catch (error) {
        console.log('Fel query, error: ', error.message);
        throw new Error('Fel query')

    } finally {
        client.close();
    }

}


function getAllEquipment(userId) {
    return get({ userId:userId }, 'equipment')
}

function getUser( userName ) {
    return get({ userName: userName }, 'users')

}

function addNewUser(newUserName, newPassword) {
    return post({ userName: newUserName, password: newPassword }, 'users')
}

function addNewEquipment(newEquipment, newCategory, newWeight, newInfo, userId) {
  
    return post({equipment: newEquipment, category: newCategory, weight: newWeight, info: newInfo, userId: userId}, 'equipment')
   
}

function deleteEquipment(id) {
    return deleteItem( {_id: new ObjectID(id)}, 'equipment' )
}


module.exports = {
    getAllEquipment,
    getUser,
    addNewUser,
    addNewEquipment,
    deleteEquipment
}