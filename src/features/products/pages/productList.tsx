import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table, Button, Tooltip } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product";
import BreadcrumbHeader from "../components/breadcumb";
import { useGetProductsQuery } from "../../api/getProduct";

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading } = useGetProductsQuery({
    limit: limit,
    skip: (page - 1) * limit,
  });

  const pageHeader = {
    title: "Products",
    breadcrumb: [{ name: "Products", href: "/" }, { name: "List" }],
  };

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
      width: 200,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price: number) => `$${price}`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 105,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
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
