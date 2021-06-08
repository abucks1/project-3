const express = require('express')
const app = express()
const port = 3000

// look for static files in 'public' folder
app.use(express.static ('public'))

//postgres setup
const db = require('./database')

const bcrypt = require('bcrypt');
const saltRounds = 10;

//set port to 3000 undless there's an enviromental variable for PORT
const PORT = process.env.PORT || 3000

// acess our data.js file
const data = require('./data.js');
const { pgp } = require('pg');

app.use(express.json());
app.use(express.urlencoded()); //Take information from URL
app.set('view engine', 'ejs') 

// Step 2 a
app.get('/', (req, res) => {
    db.any('SELECT * FROM schedules;')
    .then((schedules) => {
    console.log(schedules)
    res.render('pages/index', {
        documentTitle: 'Homepage',
        schedules: schedules
    })
 })
 .catch((err) => {
     res.send(err)
 })
})

//Step 2 b
app.get('/new',(req, res) => {
    res.render('pages/schedulesnew')
})
app.post('/new' ,(req, res) => {
    console.log(req.body)
    newSchedule = {
        username: req.body.username,
        day: +req.body.day,
        start_time: req.body.start_time,
        end_time: req.body.end_time
      };
      console.log(newSchedule)

    db.none('insert into schedules(username, day, start_time, end_time)' +
    'values(${newSchedule.username}, ${newSchedule.day}, ${newSchedule.start_time}, ${newSchedule.end_time})',{newSchedule} )
.catch((err) => {
  res.send(err)
})
res.redirect('/new')
})

app.get('/view', (req, res) => {
    db.any('SELECT * FROM schedules;')
    .then((schedules) => {
    console.log(schedules)
    res.render('pages/view', {
        documentTitle: 'Homepage',
        schedules: schedules
    })
 })
 .catch((err) => {
     res.send(err)
 })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 