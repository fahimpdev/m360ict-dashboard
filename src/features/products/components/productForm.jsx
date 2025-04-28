// src/components/ProductForm.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";

const { Option } = Select;

export default function ProductForm({ product, onSubmit }) {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log("====================================");
  console.log("categories", categories);
  console.log("====================================");

  // Effect to prefill form fields with product data
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category, // Also set the category if editing
      });
    }
  }, [product, form]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  if (loading) {
    return <Spin tip="Loading categories..." />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="max-w-xl"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input placeholder="Enter price" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a category">
          {categories.map((category) => (
            <Option key={category.name} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {product ? "Update Product" : "Create Product"}
        </Button>
      </Form.Item>
    </Form>
  );
}
