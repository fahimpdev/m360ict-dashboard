import React from "react";
import { Breadcrumb, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

// 1. Define the breadcrumb item type
type BreadcrumbItem = {
  name: string;
  href?: string;
};

// 2. Define the pageHeader type
interface PageHeaderType {
  title?: string;
  breadcrumb?: BreadcrumbItem[];
}

// 3. Define the props type
interface BreadcrumbHeaderProps {
  pageHeader: PageHeaderType;
}

// 4. Write the component with types
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
