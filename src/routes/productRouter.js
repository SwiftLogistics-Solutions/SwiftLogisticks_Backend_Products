import express from "express"
import {showProducts, getProductById, getOffers, decrementProductCount} from "../controllers/productController.js"
const productRouter = express.Router();

productRouter.get("/", showProducts);
productRouter.get("/offers", getOffers);
productRouter.post("/decrement-count", decrementProductCount);
productRouter.get("/:id", getProductById);

export default productRouter;
