import React, { useState } from "react";

// Components
import Editor from "../components/editor";
import Nav from "../components/nav/nav";
import Sidebar from "../components/sidebar/sidebar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar open={sidebarOpen} />
      <div className="inner-wrapper">
        <Nav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Editor />
      </div>
    </>
  );
};

export default Dashboard;
