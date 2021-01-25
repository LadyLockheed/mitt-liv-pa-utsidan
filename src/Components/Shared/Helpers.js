import axios from 'axios'

export const  getAllEquipment = async () => {

    try {

        const response = await axios.get('/api/allEquipment')
        return response.data

    }
    catch (err) {
        console.log('Meddelande från frontend: nånting gick fel', err)
        return err
    }

}