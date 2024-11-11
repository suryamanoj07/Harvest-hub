/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FarmerDashboard.css";
import { useSelector } from "react-redux";

const FarmerDashboard = () => {
  let { currentUser } = useSelector((state) => state.user);
  const email = currentUser.email;

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchFarmerProducts = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/farmerlist",
        { email }
      );

      if (response.data.success) {
        setProducts(response.data.products);
        if (response.data.products.length === 0) {
          toast.info("No products found for this farmer.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching products.");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteClick = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/product/farmerdelete/${productId}`);
        if (response.data.success) {
          toast.success("Product deleted successfully!");
          fetchFarmerProducts(); // Refresh the product list
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error deleting product.");
      }
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editingProduct,
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      stockQuantity: e.target.stockQuantity.value, // Stock field added here
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/farmerupdate/${editingProduct._id}`,
        updatedProduct
      );
      if (response.data.success) {
        toast.success("Product updated successfully!");
        setEditingProduct(null);
        fetchFarmerProducts(); // Refresh product list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating product.");
    }
  };

  useEffect(() => {
    if (email) fetchFarmerProducts();
  }, [email]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Items</h2>

      {products.length === 0 ? (
        <div className="no-products-message">No products found for this farmer.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:3000/images/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-category">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="product-price">
                <strong>Price:</strong> Rs {product.price}/-
              </p>
              <p className="product-stock">
                <strong>Stock remaining :</strong> {product.stockQuantity} items
              </p>
              <p
                className={`product-status ${
                  product.status === "Sold Out" ? "sold-out" : "on-sale"
                }`}
              >
                <strong>Status:</strong> {product.status}
              </p>

              <div className="product-actions flex gap-4 justify-around my-4">
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <div className="edit-modal">
          <form onSubmit={handleUpdateProduct}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingProduct.name}
              required
            />
            <label>Description</label>
            <textarea
              name="description"
              defaultValue={editingProduct.description}
              required
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              defaultValue={editingProduct.price}
              required
            />
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              defaultValue={editingProduct.stockQuantity}
              required
            />
            <div>
              <button type="submit">Update Product</button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
