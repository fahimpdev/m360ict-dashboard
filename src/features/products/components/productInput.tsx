import React from "react";
import { Form, Input, Select } from "antd";
import { FormInstance } from "antd/es/form";

import SideBar from "./sidebar";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductFormProps {
  categories: Category[];
  form: FormInstance;
}

const { Option } = Select;

const ProductInput: React.FC<ProductFormProps> = ({ categories, form }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <SideBar title="Product" description="Product description" />

      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Name"
            name="title"
            rules={[{ required: true, message: "Product name is required" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select category">
              {categories.map((category) => (
                <Option key={category.slug} value={category.slug}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="availabilityStatus"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Input placeholder="e.g. available, out-of-stock" />
          </Form.Item>

          {/* 👉 New Field: Brand */}
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Brand is required" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>

          {/* 👉 New Field: Warranty Information */}
          <Form.Item
            label="Warranty Information"
            name="warrantyInformation"
            rules={[
              {
                required: true,
                message: "Warranty information is required",
              },
            ]}
          >
            <Input placeholder="Enter warranty details" />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Write product description here"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default ProductInput;
