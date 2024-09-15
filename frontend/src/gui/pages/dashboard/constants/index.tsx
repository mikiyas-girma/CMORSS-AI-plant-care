import { DASHBOARD_PATH } from '@/routes/paths';
import {
  LayoutDashboard,
  MessagesSquare,
  Leaf,
  NotebookPen,
  UserCog,
  List,
} from '@/assets/Icons';

import { Chat3D, Community3D, Journal3D, Plant3D } from '@/assets';

export const navigationLinks = [
  {
    label: 'Dashboard',
    route: DASHBOARD_PATH.home,
    icon: LayoutDashboard,
  },
  {
    label: 'My Plants',
    route: DASHBOARD_PATH.myplants,
    icon: List,
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

export const quickShortcuts = [
  {
    image: Chat3D,
    title: 'Chat With AI',
    className: 'bg-primary-green',
    description: 'Start a conversation to learn about your plants, and more.',
    route: DASHBOARD_PATH.chat,
  },

  {
    image: Plant3D,
    title: 'Identify Plant',
    className: 'bg-gray-full',
    description: 'Take a picture of your plant to identify its name or disease',
    route: DASHBOARD_PATH.plantIdentification.root,
  },

  {
    image: Journal3D,
    title: 'Plant Journal',
    className: 'bg-primary-orange',
    description:
      'Keep a journal of your plant / crop activity to track your progress.',
    route: DASHBOARD_PATH.journal,
  },

  {
    image: Community3D,
    title: 'Chat With AI',
    className: 'bg-secondary-blue',
    description: 'Start a conversation to learn about your plants, and more.',
    route: DASHBOARD_PATH.community,
  },
];
