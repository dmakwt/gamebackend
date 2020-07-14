const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const Profile = require('../models/profile')
const Item = require('../models/item')
const Inventory = require('../models/inventory')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authadmin')

const router = new express.Router()


router.get('/inventory/getuseritems/:id', auth, authAdmin, async (req, res) => {
    try {
        const userInventory = await Inventory.findById(req.params.id)

        if (!userInventory) {
            return res.status(404).send()
        }
        

        if(userInventory.items.length===0){
             return res.status(200).send({data:[]})
        }

        let data = []
        // userInventory.items.forEach(async (item)=>{
        //     item = await Item.findById(item)
        //     // console.log(item._doc)
        //     data.push('1')
        // })

        for(let i = 0; i < userInventory.items.length; i++) {
            item = await Item.findById(userInventory.items[i])
            // console.log(item)
            data.push(item)
        }



        // console.log(data)
        res.status(200).send({data})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/inventory/giveuseritem/:id', auth, authAdmin, async (req, res) => {
    try {
        const userID = req.params.id
        const itemID = req.body.itemid
        
        const userInventory = await Inventory.findById(userID)

        if (!userInventory) {
            return res.status(404).send()
        }
        
        await userInventory.items.push(itemID)
        userInventory.save()

        res.status(200).send(userInventory)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router





