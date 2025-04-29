import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import ProductList from "./features/products/pages/productList";
import ProductDetails from "./features/products/pages/ProductDetails";
import { store } from "./app/store";
import EditProductPage from "./features/products/pages/EditProductPage";
import DashboardLayout from "./app/layouts/dasdboardLayout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product/:id/edit" element={<EditProductPage />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </Provider>
  );
}

export default App;
