const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middlewares/auth')
const Profile = require('../models/profile')
const {increaseEnergy} = require('../scheduled_tasks/run_increase_energy')



const router = new express.Router()


router.post('/attack/monster', async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ usernameID: req.body.usernameID  })
        const myOldEnergy = myProfile.energy


        if (!myProfile) {
            return res.status(404).send()
        }
        myProfile.energy = myOldEnergy - 30
        await myProfile.save()

       
        await increaseEnergy(myProfile,'5 seconds')


         

        res.status(201).send()

    } catch (error) {
        res.status(500).send({ error })
    }



})


router.post('/attack/person', async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ usernameID: req.body.usernameID })
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

