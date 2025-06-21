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
    icon: <LayoutDashboard className="w-5 h-5" />, 
    path: '/dashboard' 
  },
  { 
    label: 'Tasks', 
    icon: <ClipboardList className="w-5 h-5" />, 
    path: '/tasks',
    notification: 3
  },
  { 
    label: 'Snippets', 
    icon: <Code2 className="w-5 h-5" />, 
    path: '/snippets' 
  },
  { 
    label: 'Assistant', 
    icon: <Bot className="w-5 h-5" />, 
    path: '/ai-assistant' 
  },
  { 
    label: 'GitHub', 
    icon: <Github className="w-5 h-5" />, 
    path: '/github' 
  },
  { 
    label: 'Documents', 
    icon: <FileText className="w-5 h-5" />, 
    path: '/documents' 
  },
  { 
    label: 'Team', 
    icon: <Users className="w-5 h-5" />, 
    path: '/team' 
  },
  { 
    label: 'Settings', 
    icon: <Settings className="w-5 h-5" />, 
    path: '/settings' 
  }
];

export default sidebarData;