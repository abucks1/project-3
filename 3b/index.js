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

// "/" This means that the following routes will generate HTML pages: (3b) Step 3
 app.get('/' , (req, res) => {
    doctitle = 'Mr. Coffee'
   res.render('pages/index', {
    
    })
})
// /users (3b)
app.get('/users' , (req, res) => {
    res.render('pages/users', {
   users: data.users

     })
 })
// Step 4 : Create forms for POST routes users/new (3b) Step 4
app.get('/users/new',(req, res) => {
    res.render('pages/usersnew')
})
app.post('/users/new' ,(req, res) => {
    console.log(req.body)
    const plainTextpassword = req.body.password
    const hash = bcrypt.hashSync(plainTextpassword, saltRounds);

        const userData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            }
            data.users.push(userData)
            console.log(data.users)
            res.redirect('/users')
       })
          
      
// Step 4 - schedules/new' (3b) Step 4
app.get('/schedules/new',(req, res) => {
    res.render('pages/schedulesnew')
})
app.post('/schedules/new' ,(req, res) => {
    data.schedules.push(req.body)
    console.log(req.body)
    res.redirect('/schedules')
    
})

// schedules (3b)
 app.get('/schedules' , (req, res) => {
    res.render('pages/schedules', {
    schedules: data.schedules

     })
 })
//route to display a given user (3b)
 app.get('/users/:id',(req, res) => {
    const id = req.params.id;
    res.render('pages/id', {
    id: data.users[id]

})
 })
// route to display the schedules of a given user (3b)
 app.get('/users/:id/schedules',(req, res) => {
    const id = Number(req.params.id)
    let schedules = []
     for ( let i = 0; i < data.schedules.length; i++) { 
         console.log(schedules) 
        let currentSchedule = data.schedules[i] 
        if (currentSchedule.user_id === id) { 
         schedules.push(currentSchedule) 
         console.log(currentSchedule)     
    console.log(schedules)
        }
    }
    res.render('pages/schedulesid', {
    schedules: schedules
    })
})






//route to display the schedules of a given user


// route to display a given user

/*
    // res.send('Welcome to our schedule website')

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

 Step 3: parameterized routes users
 
app.get('/users/:id',(req, res) => {
    const id = req.params.id;
    res.send(data.users[id]);
})

 //Step 3: parameterized routes users 
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
    res.send(req.body)

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
*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 