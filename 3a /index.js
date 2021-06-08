const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcrypt');
const saltRounds = 10;

// acess our data.js file
const data = require('./data.js')

app.use(express.json());
app.use(express.urlencoded()); //Take information from URL
app.set('view engine', 'ejs') 


 app.get('/' , (req, res) => {

res.send('Welcome to our schedule website')
})


 // returns set of users
 app.get('/users', (req, res) => {
   console.log(data.users)
    res.send(data.users)
   

 })

 // returns set of schedules
 app.get('/schedules', (req, res) => {
    console.log(data.schedules)
    res.send(data.schedules)
 })

 // Step 3: parameterized routes users
 
app.get('/users/:id',(req, res) => {
    const id = req.params.id;
    res.send(data.users[id]);
})

 //Step 3: parameterized routes users is this correct?
 app.get('/users/:id/schedules',(req, res) => {
    const id = Number(req.params.id)
    let schedules = []

    for (i = 0; i < data.schedules.length; i++) {
    let currentSchedule = data.schedules[i]
    if ( currentSchedule.user_id === id) {
        schedules.push(currentSchedule)
        }
    }
    res.send(schedules); 
})

//Step 4 : Create routes to update data schedules
app.post('/schedules',(req, res) => {
    data.schedules.push(req.body)
    console.log(req.body);
    const newSchedules = {
        user_id: req.body.user_id,
        day: req.body.day,
        start_at: req.body.start_at,
        end_at: req.body.end_at,
        }
        data.users.push(newSchedules)
        console.log(data.schedules)
    res.send(data.schedules)

})
// Step 4: Add Donald Duck, encrypted password 
app.post('/users',(req, res) => {
      
    const plainTextpassword = req.body.password
        const hash = bcrypt.hashSync(plainTextpassword, saltRounds);

            const userData = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                }
                res.send(userData)
                data.users.push(userData)
                console.log(data.users)

        })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 