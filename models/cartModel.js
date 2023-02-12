import mongoose from "mongoose";
const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: { type: String },
    rating: { type: Number },
    price: { type: Number },
    category: { type: String },
    stock: { type: Number },
    img_url: { type: String },
    model: { type: String },
    specification: { type: String },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
