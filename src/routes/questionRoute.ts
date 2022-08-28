import express from 'express'
import questionCtr from '../controllers/questionCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()
// C.R.U.D (Create, Read, Update, Delete)

router.get('/question/getall', questionCtr.getall)

router.get('/question/get/:id', questionCtr.get)

router.post('/question/add', checkProductData, questionCtr.add)

router.patch('/question/update/:id', checkProductData, questionCtr.update)

router.delete('/question/delete/:id', questionCtr.delete)

export default router;