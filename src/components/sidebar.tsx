// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Menu } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const items = [
    {
      key: "/products",
      icon: <AppstoreOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    // Add more items here
  ];

  return (
    <>
      {/* Top Navbar with Menu Button */}
      <div className="lg:hidden flex w-full bg-white p-4 ">
        <button onClick={() => setCollapsed(false)}>
          <MenuOutlined className="text-2xl text-gray-800 mr-4" />
        </button>
        <h1 className="font-bold mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]">
          Dashboard
        </h1>
      </div>

      {/* Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setCollapsed(true)}>✕</button>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={() => setCollapsed(true)}
        />
      </div>

      {/* Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
