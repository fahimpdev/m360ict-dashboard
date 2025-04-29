import React, { useEffect, useState } from "react";
import { Form, Button, Spin, Divider } from "antd";
import ProductInput from "./productInput";
import ReviewInput from "./reviewInput";
import AdditionInput from "./additionalInput";

import { useGetCategoriesQuery } from "../../api/getCategories";
import { toast } from "react-toastify";

interface ProductUpdateFormProps {
  product?: any;
  onSubmit: (values: any) => void;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({
  product,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loading for the button

  const { data, isLoading, error } = useGetCategoriesQuery();
  const categories: any[] = data || [];

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
        shippingInformation: product.shippingInformation,
        returnPolicy: product.returnPolicy,
      });
    }
  }, [product, form]);

  const handleFinish = async (values: any) => {
    if (!product?.id) {
      toast.error("Product ID is missing!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("API returned an error");
      }

      toast.success("Product updated successfully!", {
        position: "top-center",
        autoClose: 500,
      });
      onSubmit(values);
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Spin tip="Loading categories..." />;
  if (error)
    return <div className="text-red-500">Failed to fetch categories</div>;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="space-y-10"
    >
      <ProductInput categories={categories} form={form} />
      <Divider />
      <ReviewInput form={form} />
      <Divider />
      <AdditionInput form={form} />

      <Form.Item>
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProductUpdateForm;
