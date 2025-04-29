import React from "react";
import { Card } from "antd";

import BreadcrumbHeader from "../components/breadcumb";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface EditPageProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
  backUrl?: string;
  children: React.ReactNode;
}

const EditPage: React.FC<EditPageProps> = ({ title, breadcrumb, children }) => {
  return (
    <div style={{ padding: 24 }}>
      <BreadcrumbHeader pageHeader={{ title, breadcrumb }} />
      <Card style={{ marginTop: 16 }}>{children}</Card>
    </div>
  );
};

export default EditPage;
