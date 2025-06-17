import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import SidebarItem from "./SidebarItem";
import sidebarData from "./sidebarData";
import { motion } from "framer-motion";
import {
  setWidth,
  toggleCollapse,
} from "../../../../Redux/ReduxSlices/SidebarSlice";
import { Switch } from "@/components/ui/switch";
import { toggleTheme } from "@/Redux/ReduxSlices/themeSlice";
import { ThemeChanger } from "@/components/ui/ThemeChanger";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const { isCollapsed, width } = useSelector((state: any) => state.sidebar);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      dispatch(setWidth(Math.max(200, Math.min(400, newWidth))));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <motion.aside
      ref={sidebarRef}
      className="fixed top-0 left-0 h-full shadow-xl z-50 bg-[var(--color-background-primary)] text-[var(--color-text-primary)]"
      animate={{ width: isCollapsed ? 60 : width }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Container with column layout */}
      <div className="flex flex-col h-full relative font-[var(--font-body)]">
        {/* Toggle Button */}
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleCollapse())}
            className="p-3 hover:bg-[var(--color-background-secondary)] transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
          {/* Logo positioned right after the button */}
          <div className="ml-4">
            {" "}
            {/* Adjust margin as needed */}
            <img
              src="/path-to-your-logo.png"
              alt="Your Logo"
              className="h-8 w-auto" // Adjust size as needed
            />
          </div>
        </div>
        {/* Sidebar Items */}
        <nav className="flex-1 overflow-y-auto space-y-1 mt-2">
          {sidebarData.map((item, index) => (
            <SidebarItem key={index} {...item} isCollapsed={isCollapsed} />
          ))}
        </nav>

        {/* Theme toggle / additional options */}
        <div className="p-3 border-t border-[var(--color-border-default)]">
          <ThemeChanger />
        </div>

        {/* Resizer (only if not collapsed) */}
        {!isCollapsed && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-[var(--color-muted)] opacity-20 hover:opacity-50 transition-opacity"
          />
        )}
      </div>
    </motion.aside>
  );
}
