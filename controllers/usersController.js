const users = require('../models/usersModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../env')


module.exports.list = (req,res)=>{
    users.findOne({email:req.body.email})
    .then(user => {
        if (!user) {
            res.status(400).json({ user: "user does not exist" });
        }
        res.json(user)
    }) 
}

module.exports.create = (req,res)=>{
    const errors={}
    const password2 = req.body.password2
    const firstName = req.body.firstName
    const lastName =req.body.lastName
    const email = req.body.email

    let password = req.body.password

    users.findOne({email:req.body.email})
    .then(async User =>{
        if(User){
            errors.user = "User already exists"
            res.status(400).json(errors);

        }
        if(password2 !== password){
            errors.password = "passwords are not the same"
            res.status(400).json(errors);

        }

        const newUser = new users({
            firstName,
            lastName,
            email,
            password
        })

            const salt = await bcrypt.genSalt(10)

            newUser.password = await bcrypt.hash(password, salt)

        newUser.save().then(User => jwt.sign({ foo: 'bar' },process.env.SECRET || env.secret, function(err, token) {
            const user = {}
            user.key = token
            user.email = email
            user.id = User._id
            res.json(user);
          })
          ).catch((err=>console.log(err)))
    })
}

