import { 
  LayoutDashboard, 
  ClipboardList, 
  Code2, 
  Bot, 
  Github,
  Settings,
  Users,
  FileText
} from 'lucide-react';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  notification?: number;
}

const sidebarData: SidebarItem[] = [
  { 
    label: 'Dashboard', 
    icon: 'LayoutDashboard', 
    path: '/dashboard' 
  },
  { 
    label: 'Tasks', 
    icon: 'ClipboardList', 
    path: '/tasks',
    notification: 3
  },
  { 
    label: 'Snippets', 
    icon: 'Code2', 
    path: '/snippets' 
  },
  { 
    label: 'Assistant', 
    icon: 'Bot', 
    path: '/ai-assistant' 
  },
  { 
    label: 'GitHub', 
    icon: 'Github', 
    path: '/github' 
  },
  { 
    label: 'Documents', 
    icon: 'FileText', 
    path: '/documents' 
  },
  { 
    label: 'Team', 
    icon: 'Users', 
    path: '/team' 
  },
  { 
    label: 'Settings', 
    icon: 'Settings', 
    path: '/settings' 
  }
];

export default sidebarData;