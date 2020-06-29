const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Item = require('../models/item')
const Employee = require('../models/employee')
const Profile = require('../models/profile')
const Inventory = require('../models/inventory')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const validator = require('validator')


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
            gems: 20,
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
            _id: user._id,
            position: "admin"
        })


        if (!employee) {
            return res.status(401).send({ error: "You are not Authorized!" })
        }

        const token = await user.generateAuthToken()

        user.token = token
        await user.save()

        res.send({ usernameID: user.usernameID, token: token })

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






//GetOneUser
router.get('/admin/getuser/:id', auth, authAdmin, async (req, res) => {
    try {



        if (validator.isEmail(req.params.id)) {
            const user = await User.findOne({ email: req.params.id })

            if (!user) { return res.status(400).send({ error: 'No User Found' }) }

            const userProfile = await Profile.findById(user._id)


            return res.status(200).send({ userProfile, banned: user.banned })
        } else {
            const user = await User.findOne({ usernameID: req.params.id })

            if (!user) {
                return res.status(400).send({ error: 'No User Found' })
            }
            const userProfile = await Profile.findById(user._id)
            return res.status(200).send({ userProfile, banned: user.banned })
        }







    } catch (error) {
        res.status(500).send()
    }
})


//Change user data
router.post('/admin/changedata/:usernameID', auth, authAdmin, async (req, res) => {
    try {
        const user = await User.findOne({ usernameID: req.params.usernameID })
        const profile = await Profile.findById(user._id)
        const newdata = req.body
       console.log(newdata)
        for (let key of Object.keys(profile._doc)) {
            if (key === 'userSkills') { }
            else if (key === 'usedItems') { }
            else if (key === 'energy') { }
            else if (key === 'xp') { }
            else if (key === 'hp') { }
            else if (key === 'position') { }
            else {
                
                if (newdata.hasOwnProperty(key) ){
                    
                    
                    profile[key] = newdata[key]
                }
        
            }
        
        }
        
        // Loop throw the profile user skills
        for (let key of Object.keys(profile._doc.userSkills)) {
            if (newdata.hasOwnProperty(key) ){
        
                profile.userSkills[key] = newdata[key]
            }
        }
        
        // Loop throw the user doc
        for (let key of Object.keys(user._doc)) {
            if (newdata.hasOwnProperty(key) ){
        
                user[key] = newdata[key]
            }
        }


        await user.save()
        await profile.save()

        res.status(200).send({ usernameID: user.usernameID })
    } catch (error) {
        res.status(500).send(error)
    }
})



//Get user Ban info
router.get('/admin/userbaninfo', auth, authAdmin, async (req, res) => {
    try {
        user = await User.findOne({ usernameID: req.query.user })

        if (!user) { return res.status(400).send({ error: 'No User Found' }) }

        const banInfo = {
            usernameID: user.usernameID,
            banned: user.banned,
            bannedEndDate: Date.parse(user.bannedEndDate) || '',
            bannedReason: user.bannedReason || ''
        }




        res.status(200).send(banInfo)
    } catch (error) {
        res.status(500).send(error)
    }
})


//Ban User
router.post('/admin/userban', auth, authAdmin, async (req, res) => {
    try {
        user = await User.findOne({ usernameID: req.body.usernameID })

        if (!user) { return res.status(400).send({ error: 'No User Found' }) }



        user.banned = req.body.banned
        user.bannedEndDate = req.body.bannedEndDate
        user.bannedReason = req.body.bannedReason

        await user.save()

        const banInfo = {
            usernameID: user.usernameID,
            banned: user.banned,
            bannedEndDate: user.bannedEndDate,
            bannedReason: user.bannedReason
        }


        res.status(200).send(banInfo)
    } catch (error) {
        res.status(500).send(error)
    }
})



//GetDataBase Properties
router.get('/admin/getprop', auth, authAdmin, async (req, res) => {
    try {
        const numUsers = await User.estimatedDocumentCount();
        const numItems = await Item.estimatedDocumentCount();
        res.status(200).send({ Users: numUsers, Items: numItems })


    } catch (error) {
        res.status(500).send(error)
    }
})




module.exports = router