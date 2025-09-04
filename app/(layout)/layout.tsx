import Sidebar from "@/components/Sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="jobhunt-platform">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
