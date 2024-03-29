const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Profile = require('../models/profile')
const Inventory = require('../models/inventory')
const auth = require('../middlewares/auth')
const { sendForgotPassword } = require('../emails/send_email')


const router = new express.Router()

router.post('/users/signup', async (req, res) => {
    const user = new User({
        ...req.body,
        usernameID: req.body.username
    })

    const profile = new Profile(
        {
            _id: user._id,
            username: user.username,
            usernameID: user.usernameID,
            email:user.email,
            avatarURL: '',
            bio: '',
            hp: 100,
            energy: 100,
            level: 1,
            xp: 0,
            skillPoints: 6,
            honor: 0,
            money: 1000,
            gems:20,
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



        res.status(201).send({ usernameID: user.usernameID, token, profile })

    } catch (error) {


        res.status(400).send({ error: error.message })
    }
});


router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const profile = await Profile.findById(user._id)

        if (user.banned === true) {
            return res.status(403).send({ error: 'Accound is banned' })
        }

        if (!profile) {
            throw new Error('Unable to login')
        }


        const token = await user.generateAuthToken()

        user.token = token
        await user.save()


        res.send({ usernameID: user.usernameID, token, profile })

    } catch (error) {
        res.status(401).send(error)
    }

})

router.post('/users/logout', auth, async (req, res) => {

    try {

        req.user.token = ''
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

// Check user token
router.get('/users/check', async (req, res) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decoded._id, 'token': token })
        const profile = await Profile.findById(user._id)

        if (!user || !profile) {
            throw new Error('Unable to login')
        }


        res.send({ success: true, profile })
    } catch (error) {
        res.status(401).send({ success: false, error: 'Please authenticate.' })
    }

})




//Recover
router.post('/users/recover', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).send('Not Valid Email or Expired Token')
        }

        const resetPasswordToken = await user.generatePasswordReset()
        const resetPasswordLink = `${process.env.APP_URL}/users/reset/${resetPasswordToken}`

        ////uncomment to send email
        // sendForgotPassword(user.email,user.username,resetPasswordLink)


        res.send({ url: resetPasswordLink })

    } catch (error) {
        res.status(500).send({ error })
    }
})




//reset
router.get('/users/reset/:resetToken', async (req, res) => {

    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.resetToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(401).render('unvalid')
        }
        res.render('reset', {
            name: user.username,
            email: user.email,
            token: req.params.resetToken
        });

    } catch (error) {
        res.status(500).send(error)
    }
})




//reset password

router.post('/users/reset/:resetToken', async (req, res) => {


    try {

        const user = await User.findOne({
            resetPasswordToken: req.params.resetToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(401).render('unvalid')
        }

        const newpassword = req.headers['newpassword']


        user.password = newpassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        await user.save()

        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})



//rendersuccessful
router.get('/users/successful', async (req, res) => {
    try {
        res.render('successful');
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router