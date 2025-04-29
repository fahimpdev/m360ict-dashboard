import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { FormInstance } from "antd/es/form";
import SideBar from "./sidebar";

interface ProductFormProps {
  form: FormInstance;
}

const { Option } = Select;

const AdditionInput: React.FC<ProductFormProps> = ({ form }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <SideBar
        title="Additional Info"
        description="Additional product details"
      />

      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Warranty Information"
            name="warrantyInformation"
            rules={[
              { required: true, message: "Warranty information is required" },
            ]}
          >
            <Input placeholder="Enter warranty information" />
          </Form.Item>

          <Form.Item
            label="Shipping Information"
            name="shippingInformation"
            rules={[
              { required: true, message: "Shipping information is required" },
            ]}
          >
            <Input placeholder="Enter shipping details" />
          </Form.Item>

          <Form.Item
            label="Return Policy"
            name="returnPolicy"
            rules={[{ required: true, message: "Return policy is required" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter return policy details"
            />
          </Form.Item>
          <Form.Item
            label="Minimum Order Quantity"
            name="minimumOrderQuantity"
            rules={[
              { required: true, message: "Minimum order quantity is required" },
            ]}
          >
            <InputNumber min={1} placeholder="Enter minimum order quantity" />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default AdditionInput;
