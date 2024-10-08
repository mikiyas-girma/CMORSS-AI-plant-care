function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const AUTH_PATH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const DASHBOARD_PATH = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, '/home'),
  profile: path(ROOTS_DASHBOARD, '/settings'),
  myplants: path(ROOTS_DASHBOARD, '/myplants'),
  chat: path(ROOTS_DASHBOARD, '/chat'),
  journal: path(ROOTS_DASHBOARD, '/journal'),
  map: path(ROOTS_DASHBOARD, '/map'),
  community: path(ROOTS_DASHBOARD, '/community'),
  settings: path(ROOTS_DASHBOARD, '/settings'),
  plantIdentification: {
    root: path(ROOTS_DASHBOARD, '/plant-identification'),
    uploading: path(ROOTS_DASHBOARD, '/plant-identification/uploading'),
  },
};
