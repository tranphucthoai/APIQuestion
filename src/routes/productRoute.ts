import express from 'express'
import productCtr from '../controllers/productCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()
// C.R.U.D (Create, Read, Update, Delete)

router.get('/product/getall', productCtr.getProducts)

router.get('/product/get/:id', productCtr.getProduct)

router.post('/product/add', checkProductData, productCtr.addProduct)

router.put('/product/update/:id', checkProductData, productCtr.updateProduct)

router.delete('/product/delete/:id', productCtr.deleteProduct)

export default router;