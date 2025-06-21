import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';



interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  path: string;
  isCollapsed: boolean;
  notification?: number;
}

export default function SidebarItem({ 
  label, 
  icon, 
  path, 
  isCollapsed,
  notification 
}: SidebarItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => 
        cn(
          "group flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
          "hover:bg-primary/10 hover:text-primary",
          "text-muted-foreground",
          isActive ? "bg-primary/10 text-primary font-medium" : "",
          isCollapsed ? "justify-center px-3" : "justify-between"
        )
      }
    >
      <div className="flex items-center gap-3">
        <span className={cn(
          "transition-colors",
          "group-hover:text-primary",
          isCollapsed ? "text-lg" : "text-base"
        )}>
          {icon}
        </span>
        {!isCollapsed && (
          <span className="truncate">{label}</span>
        )}
      </div>
      
      {!isCollapsed && notification && (
        <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
          {notification}
        </span>
      )}
    </NavLink>
  );
}