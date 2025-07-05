import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logo from "@/public/logo.png";
import { ThemeChanger } from "@/components/ui/ThemeChanger";
import { Menu, LayoutDashboard, ClipboardList, Code2, Bot, Github, FileText, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "@/Redux/Store";
import { setScreenSize, toggleCollapse } from "@/Redux/ReduxSlices/SidebarSlice";

export default function Sidebar() {
const { isCollapsed,isSidebarOpen, width, screenSize } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const location = useLocation()
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      dispatch(setScreenSize(Math.max(200, Math.min(400, newWidth))));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const navItemClass = `flex items-center px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background-secondary hover:text-text-primary rounded-md group`;
useEffect(() => {
  if (screenSize === 'mobile' && !isCollapsed) {
    dispatch(toggleCollapse());
  }
}, [location.pathname]);
  return (
<motion.aside
  ref={sidebarRef}
  className={`
    z-50 bg-background-primary text-text-primary shadow-xl transition-all h-screen
    ${screenSize === 'mobile' && !isSidebarOpen ? 'hidden' : ''}
    ${screenSize === 'mobile' ? 'fixed top-0 left-0' : ''}
  `}
  animate={{ width: isCollapsed ? 60 : width }}
  transition={{ type: 'tween', duration: 0.3 }}
>


      <div className="flex flex-col h-full relative font-body overflow-hidden">
        {/* Toggle + Logo */}
        <div className="flex items-center px-2 py-3">
          <button
            onClick={() => dispatch(toggleCollapse())}
            className="p-2 hover:bg-background-secondary rounded transition-colors"
          >
            <Menu className="w-5 h-5 text-muted" />
          </button>
          <div className="ml-4">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 rounded-lg ${isCollapsed ? "w-6" : "w-20"}`}
            />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto space-y-1 mt-2">
          <Link to="/dashboard" className={navItemClass}>
            <LayoutDashboard className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          <Link to="/tasks" className={navItemClass}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <ClipboardList className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
                {!isCollapsed && <span>Tasks</span>}
              </div>
              {!isCollapsed && (
                <span className="px-2 py-1 text-xs font-bold text-white bg-error rounded-full">
                  3
                </span>
              )}
            </div>
          </Link>

          <Link to="/snippets" className={navItemClass}>
            <Code2 className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Snippets</span>}
          </Link>

          <Link to="/ai-assistant" className={navItemClass}>
            <Bot className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Assistant</span>}
          </Link>

          <Link to="/github" className={navItemClass}>
            <Github className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>GitHub</span>}
          </Link>

          <Link to="/documents" className={navItemClass}>
            <FileText className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Documents</span>}
          </Link>

          <Link to="/team" className={navItemClass}>
            <Users className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Team</span>}
          </Link>

          <Link to="/settings" className={navItemClass}>
            <Settings className={`h-5 w-5 text-muted group-hover:text-text-primary ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </nav>

        {/* Theme Switcher */}
        <div className="p-3 border-t border-border-default">
          <ThemeChanger />
        </div>

        {/* Resizer */}
        {!isCollapsed && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-muted opacity-20 hover:opacity-50 transition-opacity"
          />
        )}
      </div>
    </motion.aside>
  );
}
