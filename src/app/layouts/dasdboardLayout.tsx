import React from "react";
import Sidebar from "../../components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="p-4 pt-0 lg:p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
