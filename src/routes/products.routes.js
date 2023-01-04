import { Router } from 'express'
import * as carts from '../controllers/carts.controller.js'

const router = Router()

router.post('/', carts.postCart)

router.post('/:cid/product/:pid', carts.addProductToCart)

router.get('/:cid', carts.getProductsByCartId)



export default router