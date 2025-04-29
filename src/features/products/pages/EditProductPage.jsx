import React from "react";
import { useParams } from "react-router-dom";
import EditPage from "./editPage";
import { useGetProductByIdQuery } from "../../api/getProductById";
import UpdateForm from "../components/updateForm";
import { useUpdateProductMutation } from "../../api/updateProductApi";

export default function EditProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id || 0);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  if (isLoading) return <p>Loading...</p>;

  //update functionality
  const handleUpdate = async (values) => {
    console.log("Form Values to Submit:", values);

    try {
      const result = await updateProduct({
        id: id || 0,
        productData: values,
      }).unwrap();

      console.log("Updated Product", result);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <EditPage
      title="Edit Product"
      breadcrumb={[
        { href: "/", name: "Products" },
        { href: `/product/${id}/edit`, name: "Edit" },
      ]}
    >
      {product ? (
        <UpdateForm
          product={product}
          onSubmit={handleUpdate}
          loading={isUpdating}
        />
      ) : (
        <p>Product not found.</p>
      )}
    </EditPage>
  );
}
