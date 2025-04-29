import React from "react";
import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";

import BreadcrumbHeader from "../components/breadcumb";
import { useGetProductByIdQuery } from "../../api/getProductById";

const ProductDetails = () => {
  const pageHeader = {
    title: "View Products",
    breadcrumb: [{ name: "Products", href: "/" }, { name: "List" }],
  };

  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (error || !product)
    return <p className="p-4 text-red-500">Error loading product</p>;

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-screen-xl mx-auto">
      <BreadcrumbHeader pageHeader={pageHeader} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
          className="h-[240px] w-[300px] object-cover rounded-lg"
        />

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {product.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2 max-w-[200px]">
            {product.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-yellow-500">
            <StarFilled />
            <span className="text-lg font-medium text-black">
              {product.rating}
            </span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="text-xl font-bold text-green-600">
            ${product.price}
          </div>

          <span
            className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${
              product.availabilityStatus === "Low Stock"
                ? "bg-yellow-500"
                : product.availabilityStatus === "Out of Stock"
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            {product.availabilityStatus}
          </span>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
            <div>
              <span className="font-medium text-black">Brand:</span>{" "}
              {product.brand}
            </div>
            <div>
              <span className="font-medium text-black">Category:</span>{" "}
              {product.category}
            </div>
            <div>
              <span className="font-medium text-black">SKU:</span> {product.sku}
            </div>
            <div>
              <span className="font-medium text-black">Stock:</span>{" "}
              {product.stock}
            </div>
            <div>
              <span className="font-medium text-black">Weight:</span>{" "}
              {product.weight}g
            </div>
            <div>
              <span className="font-medium text-black">Min. Order:</span>{" "}
              {product.minimumOrderQuantity}
            </div>
          </div>

          <div className="pt-4 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Warranty:</strong> {product.warrantyInformation}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions?.width} x{" "}
              {product.dimensions?.height} x {product.dimensions?.depth} cm
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews?.map((review: any, idx: any) => (
            <div
              key={idx}
              className="p-4 border rounded-md bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium">{review.reviewerName}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
