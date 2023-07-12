import Product from "../models/productModel.js";

const getProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

const getProductById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    })
    .catch((err) => console.log(err));
};

export { getProducts, getProductById };
