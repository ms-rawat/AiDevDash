import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import SidebarItem from './SidebarItem';
import sidebarData from './sidebarData';
import { motion } from 'framer-motion';
import { setWidth, toggleCollapse } from '../../../../Redux/ReduxSlices/SidebarSlice';

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
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.aside
      ref={sidebarRef}
      className="fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl z-50"
      animate={{ width: isCollapsed ? 60 : width }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div className="h-full flex flex-col relative">
        <button
          onClick={() => dispatch(toggleCollapse())}
          className="p-2 hover:bg-slate-700"
        >
          ☰
        </button>
        <nav className="flex-1 overflow-y-auto">
          {sidebarData.map((item, index) => (
            <SidebarItem key={index} {...item} isCollapsed={isCollapsed} />
          ))}
        </nav>
        {!isCollapsed && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-slate-600 opacity-20 hover:opacity-50"
          />
        )}
      </div>
    </motion.aside>
  );
}