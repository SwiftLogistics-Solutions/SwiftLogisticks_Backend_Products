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
