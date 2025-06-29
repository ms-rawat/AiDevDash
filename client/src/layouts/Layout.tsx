import Sidebar from "@/components/sidebar_package/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function Layout() {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      {/* Sidebar stays inline with layout */}
      <aside>
        {" "}
        <Sidebar />
      </aside>

      {/* Right side: header + content */}
      <div className="flex flex-col flex-1 bg-background-primary overflow-hidden">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
