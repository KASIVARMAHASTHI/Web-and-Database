//require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./server/routes/user')
const noteRoutes = require('./server/routes/note')

app.use(express.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, OPTIONS");
    next();
});

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// app.get('*', function(req,res){
//     res.sendFile(path.resolve(__dirname,'public','login.html'));
//     res.sendFile(path.resolve(__dirname,'public','note.html'));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} !`));