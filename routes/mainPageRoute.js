const express = require('express');

const router = express.Router();

router.get('/mainPage', (req,res) => {
    res.send('hellow world');
})

module.exports = router;