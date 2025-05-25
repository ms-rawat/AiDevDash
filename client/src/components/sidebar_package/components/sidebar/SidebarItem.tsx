import { NavLink } from 'react-router-dom';

export default function SidebarItem({ label, icon, path, isCollapsed }: any) {
  return (
    <NavLink
      to={path}
      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors"
    >
      <span>{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}