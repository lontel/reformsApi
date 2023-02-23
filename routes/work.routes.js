const router = require('express').Router()
const Work = require('../models/Work.model')


// Create new work
router.post('/create', (req, res, next) => {
    const { title, description, category, images } = req.body

    Work
        .create({ title, description, category, images })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Find all works
router.get('/all', ( req, res, next ) => {
     
    Work
        .find()
        .limit(4)
        .sort({createdAt: -1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
}) 

// Find one specific work
router.get('/one/:work_id', (req, res, next) => {

    const { work_id } = req.params
    Work
        .findById(work_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})  

// Edit work
router.put('/edit/:work_id', ( req, res, next ) => {

    const { work_id } = req.params
    const { title, description, category, images } = req.body

    Work
        .findByIdAndUpdate(work_id, { title, description, category, images })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Delete work
router.delete( '/delete/:work_id', ( req, res, next ) => {

    const { work_id } = req.params

    Work
        .findByIdAndDelete(work_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router