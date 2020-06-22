const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Employee = require('../models/employee')
const Profile = require('../models/profile')
const Inventory = require('../models/inventory')
const auth = require('../middlewares/auth')


const router = new express.Router()


//Create Admin
router.post('/admin/signup', async (req, res) => {

    if (!req.body.position) {
        return res.status(400).send({ error: "Position must be provided" })
    }

    const user = new User({
        ...req.body,
        usernameID: req.body.username
    })

    const employee = new Employee(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            position: req.body.position
        }
    )

    const profile = new Profile(
        {
            _id: user._id,
            username: user.username,
            usernameID: user.usernameID,
            email: user.email,
            position: req.body.position,
            showLeaderboard: false,
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
        await employee.save()
        await profile.save()
        await inventory.save()
        const token = await user.generateAuthToken()


        res.status(201).send({
            usernameID: user.usernameID,
            token: token,
            position: employee.position
        })

    } catch (error) {


        res.status(400).send({ error: error.message })
    }
});
// Login Admin
router.post('/admin/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const employee = await Employee.findOne({
            _id:user._id,
            position:"admin"
        })


        if(!employee){
            return res.status(401).send({ error: "You are not Authorized!" })
        }

        const token = await user.generateAuthToken()

        user.token = token
        await user.save()

        res.send({ usernameID: user.usernameID, token:token })

    } catch (error) {
        res.status(401).send(error)
    }

})
// Logut Admin
router.post('/admin/logout', auth, async (req, res) => {

    try {

        req.user.token = ''
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }

})



//GetUsers
// Get admin/getusers?limit=10&skip=0or10or20
router.get('/admin/getusers',auth,async(req, res) => {
    try {
        if(!req.query.limit ||  !req.query.skip){
            return res.status(500).send()
        }

        const users = await Profile.find()
        .limit( parseInt(req.query.limit) )
        .skip(parseInt(req.query.skip) )
        
        
        res.send({users})


    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router