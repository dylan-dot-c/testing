import express from 'express'

import { v4 as uuidv4} from 'uuid';

const router = express.Router()

let users = [
    {
        "userId": "1234",
        "firstName": "John",
        "lastName": "Doe",
        "age": 25
    },
    {
        "userId": "2345",
        "firstName": "Jane",
        "lastName": "Smith",
        "age": 24
    }
]

// all routes will start from /user
// route for users to get
router.get('/', (req, res) => {
    console.log(users)
    console.log(uuidv4())
    res.send(users)
})

//route for posting data 
router.post( '/', (req, res) => {
    console.log("POST Route has reached")
    console.log(req.body)

    const newUser = {...req.body, userId: uuidv4().substring(0,4)}
    users.push(newUser)
    console.log(users)
    // res.send("POST Route has reached")
    res.send(newUser)
}) 

//route for find a spce recor with an id
router.get('/:id', (req, res) => {

    const result = users.find( (user) => {
        return user.userId === req.params.id
    })

    if(result) {
        res.send(result)
        console.log(result)
    } else {
        res.send("No data found for this id")
    }

    
})


router.delete('/:id', (req, res) => {
    const { id } = req.params
    // req.params.id

    users = users.filter( (user) => {
        return user.userId != id
    })

    res.send(`So you want to delete the user of id ${id}`)
    alert("Becareful because we dont like you.")
})


router.patch( '/:id', (req, res) => {
    const { id } = req.params
    let index = -1

    let user = users.find( (user, idx) => user.userId === id)

    user = {...user, ...req.body}

    res.send(user)
    
})
export default router