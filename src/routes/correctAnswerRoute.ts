import express from 'express'
import correctAnswerCtrl from '../controllers/correctAnswerCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()

router.get('/correct-answer/getall', correctAnswerCtrl.getall)

router.get('/correct-answer/get/:id', correctAnswerCtrl.get)

router.post('/correct-answer/add', checkProductData, correctAnswerCtrl.add)

router.put('/correct-answer/update/:id', checkProductData, correctAnswerCtrl.update)

router.delete('/correct-answer/delete/:id', correctAnswerCtrl.delete)

export default router;