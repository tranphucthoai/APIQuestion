// attentionQuestionModel

import express from 'express'
import attentionQuestionCtrl from '../controllers/attentionQuestionCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()

router.get('/attention-question/getall', attentionQuestionCtrl.getall)

router.get('/attention-question/get/:id', attentionQuestionCtrl.get)

router.post('/attention-question/add', checkProductData, attentionQuestionCtrl.add)

router.put('/attention-question/update/:id', checkProductData, attentionQuestionCtrl.update)

router.delete('/attention-question/delete/:id', attentionQuestionCtrl.delete)

export default router;