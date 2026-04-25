import {
  Bell,
  Briefcase,
  CalendarDays,
  CheckSquare,
  FileText,
  LayoutGrid,
  Users,
} from 'lucide-react';

export const portalProjects = [
  {
    id: 'lakeview-residence-renovation',
    name: 'Lakeview Residence Renovation',
    ref: '5849.0',
    location: 'Lakeview, IL',
    status: 'In Construction',
    progress: '62% Complete',
  },
  {
    id: 'north-shore-smart-home',
    name: 'North Shore Smart Home',
    ref: '1942.0',
    location: 'North Shore, IL',
    status: 'Planning',
    progress: '18% Complete',
  },
  {
    id: 'cedar-terrace-outdoor-living',
    name: 'Cedar Terrace Outdoor Living',
    ref: '7721.0',
    location: 'Cedar Terrace, IL',
    status: 'Finishing',
    progress: '84% Complete',
  },
];

export const workspaceNav = [
  { label: 'Dashboard', to: '/portal', icon: LayoutGrid },
  { label: 'Notifications', href: '#notifications', icon: Bell, badge: 3 },
  {
    label: 'Project',
    to: '/portal/project/lakeview-residence-renovation',
    icon: Briefcase,
  },
  { label: 'Schedule', href: '#schedule', icon: CalendarDays },
  { label: 'Documents', href: '#documents', icon: FileText },
  { label: 'Permits', href: '#permits', icon: FileText },
];

export const supportNav = [
  { label: 'Team', href: '#contacts', icon: Users },
  { label: 'Approvals', href: '#decisions', icon: CheckSquare, badge: 2 },
];
