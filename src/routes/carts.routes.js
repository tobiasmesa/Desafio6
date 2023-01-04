import { Router } from "express";

import * as products from '../controllers/products.controller.js'

const router = Router()

router.get('/', products.getProducts)

router.get('/:pid', products.getproductById)

router.post('/', products.postProduct)

router.put('/:pid', products.updateProduct)

router.delete('/:pid', products.deleteProductById)

export default router