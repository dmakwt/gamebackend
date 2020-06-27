const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const Profile = require('../models/profile')
const Item = require('../models/item')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

const router = new express.Router()


router.post('/item/createItem', auth, authAdmin, async (req, res) => {
    
})

router.get('/item/getItem/:id', auth, async (req, res) => {

})

router.patch('/item/editItem/:id', auth, authAdmin, async (req, res) => {

})

router.delete('/item/deleteItem/:id', auth, authAdmin, async (req, res) => {

})

router.get('/item/allItems', auth, authAdmin, async (req, res) => {

})


module.exports = router





