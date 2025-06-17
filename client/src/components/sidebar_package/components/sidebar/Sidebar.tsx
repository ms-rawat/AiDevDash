import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  setWidth,
  toggleCollapse,
} from "../../../../Redux/ReduxSlices/SidebarSlice";
import logo from "../../../../../public/logo.png";
import { ThemeChanger } from "@/components/ui/ThemeChanger";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  Code2,
  Bot,
  Github,
  FileText,
  Users,
  Settings,
} from "lucide-react";
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
      className=" h-full shadow-xl z-50 bg-gradient-to-b from-[#E6E6FA] via-[#E0E0F5] to-[#D8D8F0] dark:bg-gradient-to-b dark:from-[#1A1A2E] dark:via-[#16213E] dark:to-[#0F3460] text-[var(--color-text-primary)]"
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
              src={logo}
              alt="Your Logo"
              className=" w-auto" // Adjust size as needed
            />
          </div>
        </div>
        {/* Sidebar Items */}
        <nav className="flex-1 overflow-y-auto space-y-1 mt-2">
          {/* Dashboard */}
          <a
            href="/dashboard"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            Dashboard
          </a>

          {/* Tasks */}
          <a
            href="/tasks"
            className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <div className="flex items-center">
              <ClipboardList className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
              Tasks
            </div>
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              3
            </span>
          </a>

          {/* Snippets */}
          <a
            href="/snippets"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <Code2 className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            Snippets
          </a>

          {/* Assistant */}
          <a
            href="/ai-assistant"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <Bot className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            Assistant
          </a>

          {/* GitHub */}
          <a
            href="/github"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <Github className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            GitHub
          </a>

          {/* Documents */}
          <a
            href="/documents"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <FileText className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            Documents
          </a>

          {/* Team */}
          <a
            href="/team"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <Users className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            Team
          </a>

          {/* Settings */}
          <a
            href="/settings"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md group"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            Settings
          </a>
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
