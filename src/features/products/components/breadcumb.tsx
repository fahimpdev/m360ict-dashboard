import React from "react";
import { Breadcrumb, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

type BreadcrumbItem = {
  name: string;
  href?: string;
};
interface PageHeaderType {
  title?: string;
  breadcrumb?: BreadcrumbItem[];
}

interface BreadcrumbHeaderProps {
  pageHeader: PageHeaderType;
}
const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ pageHeader }) => {
  const { title, breadcrumb } = pageHeader || {};

  return (
    <div style={{ marginBottom: 16 }}>
      {title && (
        <Title level={3} style={{ marginBottom: 8 }}>
          {title}
        </Title>
      )}
      <Breadcrumb>
        {breadcrumb?.map((item, index) => {
          const isLast = index === breadcrumb.length - 1;
          return (
            <Breadcrumb.Item key={index}>
              {item.href && !isLast ? (
                <Link to={item.href}>{item.name}</Link>
              ) : (
                item.name
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
