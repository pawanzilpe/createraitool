// src/page/frontend/Products.jsx
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      // Remove deleted product locally for faster UX
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", fontFamily: "Arial" }}>
        Loading products...
      </p>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4 style={{ marginBottom: "10px" }}>{p.title}</h4>
              <p style={{ marginBottom: "10px", color: "#555" }}>
                {p.description}
              </p>
              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
