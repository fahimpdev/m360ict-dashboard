import React from "react";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify styles
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { store } from "./app/store";
import DashboardLayout from "./app/layouts/dasdboardLayout";
import ProductList from "./features/products/pages/productPage";
import ProductDetails from "./features/products/pages/ProductDetails";
import EditProductPage from "./features/products/pages/EditProductPage";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

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
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
