import express from "express";

const router = express.Router()

router.get('/chat', (req, res) => {
    res.json({message: 'signin'})
})

export default router