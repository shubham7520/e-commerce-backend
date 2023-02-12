import Cart from "../models/cartModel.js";
import Product from "../models/prodectModel.js";

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    if (!product) {
      return res.status(400).json({ error: true, message: "Not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    let product = await Product.findById(req.params.product_id).select(
      "-_id -createdAt -updatedAt -__v"
    );
    if (!product) {
      return res.status(400).json({ error: true, message: "Not found" });
    }
    let cartItem = await Cart.findOne({
      product_id: req.params.product_id,
      user: req.user._id,
    });
    if (cartItem) {
      return res
        .status(400)
        .json({ error: true, message: "Item already added" });
    }
    product = {
      ...product._doc,
      product_id: req.params.product_id,
      user: req.user._id,
    };

    cartItem = await Cart.create(product);
    res
      .status(201)
      .json({ success: true, cartItem, message: "Item added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const cartItem = async (req, res) => {
  try {
    const cartItem = await Cart.find({
      user: req.user._id,
    });
    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
export { getAllProducts, getProductDetails, addToCart, cartItem };
