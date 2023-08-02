import product from '../models/product';

export const createProduct = async (req, res) => {
  const {
    name, price, imgURL, type,
  } = req.body;
  // eslint-disable-next-line new-cap
  const newProduct = new product(
    {
      name, price, imgURL, type,
    },
  );
  const productSaved = await newProduct.save();
  console.log(req.body); // mirar lo que el clienete envia.
  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await product.find(); // devuelve lista de productos
  res.json(products);
};

export const getProductById = async (req, res) => {
  const producto = await product.findById(req.params.productId);
  res.status(200).json(producto);
};

export const updateProductById = async (req, res) => {
  const updateProduct = await product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
  });
  res.status(200).json(updateProduct);
  // staus
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  await product.findByIdAndDelete(productId);
  res.status(204).json();
};
