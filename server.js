const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
// require('dotenv').config() //so we can make use of .env files

const app           = express();



app.use(express.static(path.join(__dirname, '/app/dist')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/dist/index.html')
})

var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
