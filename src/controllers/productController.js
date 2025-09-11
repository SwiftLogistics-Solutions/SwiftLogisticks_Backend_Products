import Product from "../modules/productModule.js";
import Offer from "../modules/offerModule.js";

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

// GET /offers - Get all active offers
export const getOffers = async (req, res) => {
  try {
    const currentDate = new Date();
    console.log('Current Date:', currentDate);
    
    // First, let's get all offers to debug
    const allOffers = await Offer.find({});
    console.log('All offers in DB:', allOffers);
    
    // Get active offers that are currently valid
    const offers = await Offer.find({
      status: 'active'
      // Temporarily removing date filter for testing
      // startDate: { $lte: currentDate },
      // endDate: { $gte: currentDate }
    });
    
    console.log('Filtered offers:', offers);
    
    if (offers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active offers found",
        debug: {
          currentDate: currentDate,
          totalOffers: allOffers.length,
          activeOffers: allOffers.filter(o => o.status === 'active').length
        }
      });
    }
    
    res.status(200).json({
      success: true,
      count: offers.length,
      data: offers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching offers",
      error: error.message
    });
  }
};

// POST /decrement-count - Decrement product stock
export const decrementProductCount = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate input
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid productId or quantity' 
      });
    }

    // Find the product first to check current stock
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }
    
    // Check if there's enough stock
    if (product.stock < quantity) {
      return res.status(400).json({ 
        success: false,
        error: 'Insufficient stock',
        currentStock: product.stock,
        requestedQuantity: quantity
      });
    }
    
    // Update the product stock
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { 
        $inc: { stock: -quantity }
      },
      { new: true } // Return the updated document
    );
    
    res.json({
      success: true,
      message: 'Stock decremented successfully',
      productId: productId,
      previousStock: product.stock,
      newStock: updatedProduct.stock,
      decrementedBy: quantity
    });
    
  } catch (error) {
    console.error('Error decrementing product stock:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
};
