import React, { useEffect, useState } from "react";
import Shop from "./Shop"; // المكوّن اللي كتبته

const ShopWrapper = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise((r) => setTimeout(r, 500));
      const data = [/* بيانات المنتجات */];
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return <Shop products={products} loading={loading} />;
};

export default ShopWrapper;
