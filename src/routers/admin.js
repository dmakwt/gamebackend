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
router.get('/admin/getuser',auth,authAdmin, async (req, res) => {
    try {
        


        if (validator.isEmail(req.query.data)) {
            const user = await User.findOne({ email: req.query.data })

            if (!user) {
                return res.status(400).send({error:'No User Found'})
            }

            const userProfile = await Profile.findById(user._id)


            return res.status(200).send({userProfile,banned:user.banned})
        } else {
            const user = await User.findOne({ usernameID: req.query.data })

            if (!user) {
                return res.status(400).send({error:'No User Found'})
            }
            const userProfile = await Profile.findById(user._id)
            return res.status(200).send({userProfile,banned:user.banned})
        }







    } catch (error) {
        res.status(500).send()
    }
})



router.post('/admin/changedata',auth,authAdmin,async(req,res)=>{
    try {
        user = await User.findOne({usernameID:req.body.usernameID})
        userProfile = await Profile.findById(user._id)
        console.log(req.body)

        

        if(req.body.banned!==user.banned){
            user.banned=req.body.banned
        }
        if(req.body.showLeaderboard!==userProfile.showLeaderboard){
            userProfile.showLeaderboard=req.body.showLeaderboard
        }
        if(req.body.avatarURL!==userProfile.avatarURL){
            userProfile.avatarURL=req.body.avatarURL
        }
        if(req.body.userBIO !==userProfile.bio){
            userProfile.bio=req.body.userBIO
        }



        //////////////////////need complete

        await user.save()
        await userProfile.save()

        res.status(200).send({message:'Changed'})
    } catch (error) {
        res.status(500).send(error)
    }
})







//GetDataBase Properties
router.get('/admin/getprop',auth,authAdmin,async(req,res)=>{
    try {
        const numUsers = await User.estimatedDocumentCount();
        const numItems = await Item.estimatedDocumentCount();
        res.status(200).send({Users:numUsers,Items:numItems})


    } catch (error) {
        res.status(500).send(error)
    }
})






module.exports = router