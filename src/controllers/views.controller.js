import productManager from '../services/products.services.js'

export const getRealTimeProducts = async (req, res) => {
    try {
  
      const productsList = await productManager.getProducts()
  
      res.render('realTimeProducts', {
        products: productsList
      })
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }