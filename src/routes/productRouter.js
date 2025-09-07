import express from "express"
import {showProducts, getProductById} from "../controllers/productController.js"
const productRouter = express.Router();

productRouter.get("/", showProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
