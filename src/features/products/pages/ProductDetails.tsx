import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/getProduct";
import React from "react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id", id);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product?.title}</h1>
      <img
        src={product?.thumbnail}
        alt={product?.title}
        style={{ width: "200px" }}
      />
      <p>
        <strong>Price:</strong> ${product?.price}
      </p>
      <p>
        <strong>Brand:</strong> {product?.brand}
      </p>
      <p>
        <strong>Category:</strong> {product?.category}
      </p>
    </div>
  );
};

export default ProductDetails;
