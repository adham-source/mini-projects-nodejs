const express = require('express')
const router = express.Router()
const Subscriber = require('../models/Subscriber')
const verify = require('./verifytoken')

// As middelware
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) return res.status(404).json({message: 'Can not find subscriber'})
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
    res.subscriber = subscriber
    next()
}

// Get all
router.get('/', verify, async (req, res) => {
    try {
        const suscribers = await Subscriber.find()
        res.send(suscribers)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Getting one
router.get('/:id', verify ,getSubscriber, (req, res) => {
   res.json(res.subscriber)
})

// Creating one
router.post('/', async (req ,res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
   
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null ) {
        res.subscriber.name = req.body.name
    }

    if(req.body.subscribedToChannel != null) { 
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel 
    }
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted subsriber'})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router