// SideBar.tsx
import React from "react";

interface SideBarProps {
  title: string;
  description: string;
}

const SideBar: React.FC<SideBarProps> = ({ title, description }) => {
  return (
    <div className="w-full md:w-1/4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default SideBar;
