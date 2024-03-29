const express = require('express')
const validator = require('validator')
const Item = require('../models/item')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authadmin')

const router = new express.Router()


router.post('/item/createItem', auth, authAdmin, async (req, res) => {
    const item = new Item(
        req.body
    )
    try {
        await item.save()

        res.status(201).send({ item })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.get('/item/getItem/:id', auth,authAdmin, async (req, res) => {

    try {
        const item = await Item.findById(req.params.id)

        if (!item) {
            return res.status(404).send()
        }

        res.status(200).send(item)
    } catch (error) {
        res.status(401).send(error)
    }

})


router.patch('/item/editItem/:id', auth, authAdmin, async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body)

        if (!item) {
            return res.status(404).send({error:'Item Not Found!'})
        }

        const newItem = await Item.findById(req.params.id)

        if (!newItem) {
            return res.status(404).send({error:'Item Not Found!'})
        }

        res.status(200).send({newItem})
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/item/deleteItem/:id', auth, authAdmin, async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)

        if (!item) {
            return res.status(404).send()
        }

        res.status(200).send(item)
    } catch (error) {
        res.status(401).send(error)
    }
})


router.get('/item/allItems', auth, authAdmin, async (req, res) => {
    try {
        const items = await Item.find()

        if (!items) {
            return res.status(404).send()
        }

        res.status(200).send({data:items.reverse()})
    } catch (error) {
        res.status(401).send(error)
    }
})




module.exports = router





