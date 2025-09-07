import Product from "../modules/productModule.js";

// GET /showProducts - Show all products
export const showProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// GET /product/:id - Show specific product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
