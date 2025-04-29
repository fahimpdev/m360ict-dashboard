// src/components/ProductForm.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Spin, Divider, Space } from "antd";

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
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        availabilityStatus: product.availabilityStatus,
        reviews: product.reviews || [],
      });
    }
  }, [product, form]);

  const handleFinish = (values) => {
    console.log("Updated Product Data:", values); // 👈 Add this line
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
        label="title"
        name="title"
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

      <Form.Item
        label="Status"
        name="availabilityStatus"
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

      <Divider />

      <Form.List name="reviews">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "reviewerName"]}
                  rules={[{ required: true, message: "Reviewer name missing" }]}
                >
                  <Input placeholder="Reviewer Name" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "rating"]}
                  rules={[{ required: true, message: "Rating missing" }]}
                >
                  <Input placeholder="Rating" type="number" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "comment"]}
                  rules={[{ required: true, message: "Comment missing" }]}
                >
                  <Input placeholder="Comment" />
                </Form.Item>

                <Button type="link" danger onClick={() => remove(name)}>
                  Delete
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Review
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="flex">
          {product ? "Update Product" : "Create Product"}
        </Button>
      </Form.Item>
    </Form>
  );
}
