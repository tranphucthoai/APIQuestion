import express from 'express'
import roleCtrl from '../controllers/roleCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()
// C.R.U.D (Create, Read, Update, Delete)

router.get('/role/getall', roleCtrl.getall)

router.get('/role/get/:id', roleCtrl.get)

router.post('/role/add', checkProductData, roleCtrl.add)

router.put('/role/update/:id', checkProductData, roleCtrl.update)

router.delete('/role/delete/:id', roleCtrl.delete)

export default router;