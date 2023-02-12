import { Router } from "express";
const router = Router();
import authMiddleware from "../middlerware/authMiddleware.js";
import {
  addToCart,
  cartItem,
  getAllProducts,
  getProductDetails,
} from "../controllers/productController.js";

router.get("/products", getAllProducts);
router.get("/products/:product_id", getProductDetails);
router.get("/products/cart/items", authMiddleware, cartItem);
router.post("/products/cart/:product_id", authMiddleware, addToCart);

export default router;
