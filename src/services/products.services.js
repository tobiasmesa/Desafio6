import fs from "fs";

// Public class -> Instance a new object with file path
// Example: const pm = new pm("PATH")
// This class doesnt use async methods!

class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path
  }

  async addProduct(newProduct) {
    try {
      // Validate constructor data
      this.#validateFields(newProduct)

      // Read products from file
      await this.#readProducts()

      // Validate product code not repeat
      if (this.products.find((product) => product.code === newProduct.code)) {
        throw new Error('Product code already exist')
      }

      const product = {
        id: this.#getMaxId() + 1,
        title: newProduct.title,
        description: newProduct.description,
        code: newProduct.code,
        price: newProduct.price,
        status: newProduct.status,
        stock: newProduct.stock,
        category: newProduct.category,
        thumbnails: newProduct.thumbnails
      }

      this.products.push(product)

      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')

    } catch (error) {
      throw new Error(error.message)
    }

  }

  async getProducts() {
    try {
      await this.#readProducts()
      return this.products
    } catch (error) {
      throw new Error('Error reading products from file')
    }
  }

  async getproductById(productId) {
    try {
      await this.#readProducts()
      const foundedProduct = this.products.find((product) => product.id === productId)
      if (foundedProduct) {
        return foundedProduct
      } else {
        throw new Error('Bad or missing product Id. Product not found')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      this.#readProducts()
      // Find index of product
      const foundedIndex = this.products.findIndex((product) => product.id === productId)
      if (foundedIndex !== -1) {
        // Update data
        this.products[foundedIndex] = {id: productId, ...updatedProduct}
        // Write on file
        await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
      } else {
        throw new Error('Bad or missing porduct id')
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(productId) {
    try {
      this.#readProducts
      this.products = this.products.filter((product) => product.id !== productId)
      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
    } catch (error) {
      throw new Error('Error deleting product')
    }
  }

  #getMaxId() {
    let maxId = 0
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id
    })
    return maxId
  }

  async #readProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        this.products = products
      } else {
        this.products = []
      }
    } catch (error) {
      throw new Error('Error reading products from file')
    }
  }

  #validateFields(newProduct) {

    const { title, description, code, price, status, stock, category, thumbnails } = newProduct

    if (!title || !isNaN(title)) {
      throw new Error('Bad or missing title. Must be a string')
    }

    if (!description || !isNaN(description)) {
      throw new Error('Bad or missing description. Must be a string')
    }

    if (!code || !isNaN(code)) {
      throw new Error('Bad or missing code. Must be a string')
    }

    if (!price || isNaN(price) || price < 0) {
      throw new Error(`Bad or missing price. Must be a number grather than zero. price = ${price}`)
    }

    if (!status) {
      throw new Error('Missing status flag')
    }

    if (!stock || isNaN(stock) || stock < 0) {
      throw new Error(`Bad or missing stock. Must be a number grather than zero. stock = ${stock}`)
    }

    if (!category || !isNaN(category)) {
      throw new Error('Bad or missing category. Must be a string')
    }

    if (!thumbnails) {
      throw new Error('Missing thumbnail')
    }

  }

}

export default new ProductManager("./products.json");
