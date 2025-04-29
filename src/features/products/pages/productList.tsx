import React, { useEffect, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Product } from "../../../types/product"; // Make sure the type is correct
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../api/getProduct"; // Import the RTK query hook
import BreadcrumbHeader from "../components/breadcumb";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  // State for pagination
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  // Use RTK Query hook to fetch products with pagination
  const { data, isLoading } = useGetProductsQuery({
    limit: limit,
    skip: (page - 1) * limit,
  });

  const pageHeader = {
    title: "Products",
    breadcrumb: [{ name: "Products", href: "/" }, { name: "List" }],
  };

  // Columns definition for the Table
  const columns: ColumnsType<Product> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail: string) => (
        <img
          width={50}
          src={thumbnail}
          alt="Thumbnail"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <div className="flex items-center gap-2">
          {/* View Button */}
          <Tooltip title="View product">
            <Button
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/product/${record.id}`)}
            />
          </Tooltip>

          {/* Edit Button */}
          <Tooltip title="Edit product">
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/product/${record.id}/edit`)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // Handle page change for pagination
  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <BreadcrumbHeader pageHeader={pageHeader} />
      <Table
        columns={columns}
        dataSource={data?.products}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  );
};

export default ProductList;
