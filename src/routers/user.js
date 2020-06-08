const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Profile = require('../models/profile')
const Inventory = require('../models/inventory')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    
    const profile = new Profile(
        {
            _id: user._id,
            username: user.username,
            avatarURL: '',
            bio: '',
            hp: 100,
            energy: 100,
            level: 1,
            xp: 0,
            skillPoints: 6,
            honor: 0,
            money: 1000,
            wins: 0,
            loses: 0
        }  
    )

    const inventory = new Inventory({
        _id: user._id,
        items: []
    })

    try {
      
        await user.save()
        await profile.save()
        await inventory.save()

        const token = await user.generateAuthToken()

  

        res.status(201).send({token })

    } catch (error) {
        if(error.code === 11000){
            const field = Object.keys(error.keyValue)[0]
            return res.status(400).send({error,message: `${field} must be unique`})
        }

        res.status(400).send(error)
    }
});


router.post('/users/login' ,async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        user.token = token
        user.save()

        res.send({token })

    } catch (error) {
        res.status(401).send(error)
    }

})

router.post('/users/logout', auth,async (req,res)=> {

    try {
        
        req.user.token = ''
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

module.exports = router