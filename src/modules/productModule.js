import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  stock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('items', productSchema);

export default Product;
