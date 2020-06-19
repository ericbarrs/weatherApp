const express = require('express')
const {list, create} = require('../controllers/usersController')

const router = express.Router()

router.get('/', list)
router.post('/', create)


module.exports = router