import React, { useState, useEffect } from "react";
import { Form, Button, message, Spin, Divider } from "antd";
import ProductInput from "./productInput";
import ReviewInput from "./reviewInput";
import AdditionInput from "./additionalInput";

interface ProductUpdateFormProps {
  product?: any;
  onSubmit: (values: any) => void;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({
  product,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<
    { slug: string; name: string; url: string }[]
  >([]); // Categories are now an array of objects
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data); // Set categories as an array of objects
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        availabilityStatus: product.availabilityStatus,
        reviews: product.reviews || [],
        brand: product.brand,
        warrantyInformation: product.warrantyInformation,
      });
    }
  }, [product, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
    message.success("Product saved successfully!");
  };

  if (loading) return <Spin tip="Loading categories..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="space-y-10"
    >
      {/* Pass categories array */}
      <ProductInput categories={categories} form={form} />
      <Divider />
      <ReviewInput form={form} />
      <Divider />
      <AdditionInput form={form} />

      <Form.Item>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProductUpdateForm;
