import { Router } from "express";
import productManager from "../services/products.services.js";


const router = Router() 

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
  });

export default  router