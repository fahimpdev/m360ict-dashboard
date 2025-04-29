import React from "react";
import { useParams } from "react-router-dom";
import EditPage from "./editPage";
import { useGetProductByIdQuery } from "../../api/getProduct";
import UpdateForm from "../components/updateForm";

export default function EditProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id || 0);

  console.log("====================================");
  console.log("product", product);
  console.log("====================================");

  if (isLoading) return <p>Loading...</p>;

  const handleUpdate = async (values) => {
    console.log("Form Values:", values);
    // Call update mutation here
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
        <UpdateForm product={product} onSubmit={handleUpdate} />
      ) : (
        <p>Product not found.</p>
      )}
    </EditPage>
  );
}
