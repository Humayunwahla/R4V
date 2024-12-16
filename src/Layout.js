import React from 'react';
import { Outlet } from "react-router-dom";
import Menubar from "./components/menubar/Menubar";
import Navbar from "./components/navbar/Navbar";

function Layout() {
    return (
        <div>
            {/* Shared components */}
            <Navbar />
            <Menubar />
            {/* Render child components */}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;