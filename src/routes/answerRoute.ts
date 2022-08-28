import express from 'express'
import answerCtrl from '../controllers/answerCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()

router.get('/answer/getall', answerCtrl.getall)

router.get('/answer/get/:id', answerCtrl.get)

router.post('/answer/add', checkProductData, answerCtrl.add)

router.patch('/answer/update/:id', checkProductData, answerCtrl.update)

router.delete('/answer/delete/:id', answerCtrl.delete)

export default router;