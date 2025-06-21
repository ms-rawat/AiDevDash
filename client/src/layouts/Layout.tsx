import Sidebar from "@/components/sidebar_package/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function Layout() {
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <aside className="">
        <Sidebar />
      </aside>
      <div className="flex flex-col bg-background-primary">
        <Header />
        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* Routed Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
