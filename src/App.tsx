import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ProductList from "./features/products/pages/productList";
import ProductDetails from "./features/products/pages/ProductDetails";
import { store } from "./app/store";
import EditProductPage from "./features/products/pages/EditProductPage";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap your app with the Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/:id/edit" element={<EditProductPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
