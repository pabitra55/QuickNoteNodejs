const connectToMongo = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');

const port = 8080


app.use(express.json()) // Enables the middleware to access data from bady end so on 
connectToMongo();


// ******* Route Collection ********

app.use(cors());
app.use('/app/auth', require('./routes/auth'));
app.use('/app/notes', require('./routes/notes'));
// app.use('/app/notes', require('./Utils/welcome.html'));



app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/Utils/welcome.html`)
});

app.get('/api/ver1/login', (req, res) => {
    res.send('you are in login page!')
});

app.get('/api/ver1/signup', (req, res) => {
    res.send('you are in signup page!')
});

app.listen(port, () => {
    console.log(`Quick Notes app listening on port ${port}`)
})