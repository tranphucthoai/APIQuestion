import express from 'express'
import userCtrl from '../controllers/userCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()
// C.R.U.D (Create, Read, Update, Delete)

router.get('/user/getall', userCtrl.getall)

router.get('/user/get/:id', userCtrl.get)

router.post('/user/add', checkProductData, userCtrl.add)

router.put('/user/update/:id', checkProductData, userCtrl.update)

router.delete('/user/delete/:id', userCtrl.delete)

export default router;