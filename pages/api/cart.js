import mongoose, { connect } from "mongoose";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();
const { ObjectId } = mongoose.Types;
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authentication token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
  } catch (error) {
    //  console.error(error);
    res.status(403).send("Server Error from cart Login to add product to cart");
  }
}

async function handlePutRequest(req, res) {
  // console.log(req.body);
  const { quantity, productId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authentication token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //get user cart base on userId
    const cart = await Cart.findOne({ user: userId });
    //check for already added products
    const productExists = await cart.products.some((doc) =>
      ObjectId(productId).equals(doc.product)
    );
    //if so increment quantity
    if (productExists) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      const newProduct = { quantity, product: productId };
      await Cart.findOneAndUpdate(
        { _id: cart.id },
        { $addToSet: { products: newProduct } }
      );
    }
    res.status(200).send("Cart Updated");
    //if not add new product with quantity
  } catch (error) {
    // console.error(error);
    res.status(403).send("Server Error from cart login to add product");
  }
}

async function handleDeleteRequest(req, res) {
  const { productId } = req.query;
  console.log(productId);
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authentication token");
  }
 
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
  } catch (error) {
    res
      .status(403)
      .send("Server Error from cart Login to Delete product to cart");
  }
}
