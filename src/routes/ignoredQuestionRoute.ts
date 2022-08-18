// ignoredQuestionRoute

import express from 'express'
import ignoredQuestionCtrl from '../controllers/ignoredQuestionCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()

router.get('/ignored-question/getall', ignoredQuestionCtrl.getall)

router.get('/ignored-question/get/:id', ignoredQuestionCtrl.get)

router.post('/ignored-question/add', checkProductData, ignoredQuestionCtrl.add)

router.put('/ignored-question/update/:id', checkProductData, ignoredQuestionCtrl.update)

router.delete('/ignored-question/delete/:id', ignoredQuestionCtrl.delete)

export default router;