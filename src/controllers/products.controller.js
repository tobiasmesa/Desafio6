import productManager from "../services/products.services.js";

export const getProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    // const products = await req.productManager.getProducts()
    const products = await productManager.getProducts();

    if (!isNaN(limit)) {
      res.status(200).json({
        success: true,
        limit: products.slice(0, Number(limit)),
      });
    } else if (limit && isNaN(limit)) {
      res.status(400).json({
        success: false,
        message: "Limit is must be a number",
      });
    } else {
      res.status(200).json({
        success: true,
        products: products,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getproductById = async (req, res) => {
  try {
    let { pid } = req.params;

    if (!isNaN(pid)) {
      // const foundedProduct = await req.productManager.getproductById(Number(pid))
      const foundedProduct = await productManager.getproductById(Number(pid));
      res.status(200).json({
        success: true,
        product: foundedProduct,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Bad or missing product ID",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const postProduct = async (req, res) => {
  try {
    const product = req.body;

    await productManager.addProduct(product);

    res.status(201).json({
      success: true,
      message: "Product creation OK",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;

    await productManager.updateProduct(Number(pid), updatedProduct);

    res.status(200).json({
      success: true,
      message: `Product Id = ${req.params.pid} successfully updated`,
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    await productManager.deleteProduct(Number(req.params.pid));

    res.status(200).json({
      success: true,
      message: `Product Id = ${req.params.pid} successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
