import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
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

const Product = mongoose.model("Product", productSchema);
export default Product;
