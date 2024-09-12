import { DASHBOARD_PATH } from '@/routes/paths';
import {
  LayoutDashboard,
  MessagesSquare,
  Leaf,
  NotebookPen,
  UserCog,
} from '@/assets/Icons';

export const navigationLinks = [
  {
    label: 'Dashboard',
    route: DASHBOARD_PATH.home,
    icon: LayoutDashboard,
  },

  {
    label: 'Chat With AI',
    route: DASHBOARD_PATH.chat,
    icon: MessagesSquare,
  },

  {
    label: 'Plant Identification',
    route: DASHBOARD_PATH.plantIdentification.root,
    icon: Leaf,
  },

  {
    label: 'Plant Journal',
    route: DASHBOARD_PATH.journal,
    icon: NotebookPen,
  },

  {
    label: 'Profile Settings',
    route: DASHBOARD_PATH.settings,
    icon: UserCog,
  },
];
