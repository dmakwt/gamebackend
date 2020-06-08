const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


router.post('/users/signin', async (req, res) => {
    const user = User(req.body)
    const profile = Profile(
        
    )

    try {
        await user.save()

        const token = user.generateAuthToken()

        res.status(201).send({ user, token })

    } catch (error) {
        res.status(400).send(error)
    }
});


router.post('/users/login' ,async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        user.token = token
        user.save()

        res.send({ user, token })

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