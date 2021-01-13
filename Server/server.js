const express = require('express')
const app = express()
 
const port = 1337; // Port number
 
 
app.get('/', (request,response) => {
   response.send('The cake is a lie')
})
 
app.listen(port, () => {
   console.log('Web server listening on port ' + port)
})