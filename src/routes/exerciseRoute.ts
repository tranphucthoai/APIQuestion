import express from 'express'
import exerciseCtrl from '../controllers/exerciseCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()

router.get('/exercise/getall', exerciseCtrl.getall)

router.get('/exercise/get/:id', exerciseCtrl.get)

router.post('/exercise/add', checkProductData, exerciseCtrl.add)

router.patch('/exercise/update/:id', checkProductData, exerciseCtrl.update)

router.delete('/exercise/delete/:id', exerciseCtrl.delete)

export default router;