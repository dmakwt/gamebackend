const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middlewares/auth')
const Profile = require('../models/profile')
const agenda = require('../agenda/agenda')



const router = new express.Router()


router.post('/attack/monster', auth, async (req, res) => {
    try {
        console.log('Fire attack monster')
        const myProfile = await Profile.findOne({ username: req.user.username })
        const myOldEnergy = myProfile.energy


        if (!myProfile) {
            return res.status(404).send()
        }
        myProfile.energy = myOldEnergy - 50
        await myProfile.save()


        await agenda.now('increase energy', myProfile.username)
        res.send()

    } catch (error) {
        res.status(500).send()
    }



})



module.exports = router

