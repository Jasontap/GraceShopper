const router = require('express').Router()
const { models: { Order }} = require('../db')
module.exports = router

router.get('/orders/:id', async(req,res,next)=>{
    try{
        res.send(await Order.findAll({
            where: {
                userId: req.params.id
            }
        }))
    }catch(er){
        next(er)
    }
})

router.post('/orders/:id', async(req,res,next)=>{
    try{
        const order = await Order.create(req.body)
        order.userId = req.params.id
        await order.save()
        res.status(201).send(order)
    }catch(er){
        next(er)
    }
})