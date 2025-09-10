import express from "express"
import {showProducts, getProductById, getOffers} from "../controllers/productController.js"
const productRouter = express.Router();

productRouter.get("/", showProducts);
productRouter.get("/offers", getOffers);
productRouter.get("/:id", getProductById);

export default productRouter;
