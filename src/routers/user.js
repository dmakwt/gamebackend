const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Profile = require('../models/profile')
const Inventory = require('../models/inventory')
const auth = require('../middlewares/auth')
const { sendForgotPassword } = require('../emails/send_email')


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



        res.status(201).send({ token })

    } catch (error) {
    

        res.status(400).send({error:error.message})
    }
});


router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        if(user.banned === true){
            return res.status(403).send({error:'Accound is banned'})
        }


        const token = await user.generateAuthToken()

        user.token = token
        await user.save()

        res.send({ token })

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


        res.send(resetPasswordLink)

    } catch (error) {
        res.status(500).send(error)
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
        res.render('reset',{
            name:user.username,
            email:user.email,
            token:req.params.resetToken
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

//rendererror




module.exports = router