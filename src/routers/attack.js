const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middlewares/auth')
const Profile = require('../models/profile')
const agenda = require('../agenda/agenda')



const router = new express.Router()


router.post('/attack/monster', auth, async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ username: req.user.username })
        const myOldEnergy = myProfile.energy


        if (!myProfile) {
            return res.status(404).send()
        }
        myProfile.energy = myOldEnergy - 10
        await myProfile.save()

        // await agenda.create('increase energy', { userId: myProfile.usernameID , firstTime:true})
        //     .repeatEvery('10 seconds')
        //     .unique({ 'data.userId': myProfile.usernameID })
        //     .save();


        res.status(201).send()

    } catch (error) {
        res.status(500).send({ error })
    }



})


router.post('/attack/person', async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ username: req.body.usernameID })
        const myOldEnergy = myProfile.energy
        

        if (!myProfile) {
            return res.status(404).send()
        }
        myProfile.energy = myOldEnergy - 10
        await myProfile.save()


        res.status(201).send()

    } catch (error) {
        res.status(500).send({ error })
    }
})



module.exports = router

