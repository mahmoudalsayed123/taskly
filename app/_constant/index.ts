export const NavList = [
  {
    id: 1,
    name: 'projects',
    icon: '/assets/icons/project.svg',
  },
  {
    id: 2,
    name: 'epics',
    icon: '/assets/icons/epic.svg',
  },
  {
    id: 3,
    name: 'tasks',
    icon: '/assets/icons/task.svg',
  },
  {
    id: 4,
    name: 'members',
    icon: '/assets/icons/members.svg',
  },
  {
    id: 5,
    name: 'details',
    icon: '/assets/icons/details.svg',
  },
];

export const NavListMobile = [
  {
    id: 1,
    name: 'Project',
    link: '/project',
    icon: '/assets/icons/project-dash.svg',
  },
  {
    id: 2,
    name: 'Epics',
    link: '/project/epics',
    icon: '/assets/icons/epic.svg',
  },
  {
    id: 3,
    name: 'Tasks',
    link: '/project/task',
    icon: '/assets/icons/task.svg',
  },
  {
    id: 4,
    name: 'Members',
    link: '/project/members',
    icon: '/assets/icons/members.svg',
  },
  {
    id: 5,
    name: 'Details',
    link: '/project/details',
    icon: '/assets/icons/details.svg',
  },
];

export const TaskStatusValues = [
  'TO_DO',
  'IN_PROGRESS',
  'BLOCKED',
  'IN_REVIEW',
  'READY_FOR_QA',
  'REOPENED',
  'READY_FOR_PRODUCTION',
  'DONE',
];

export const statusBackgroundColors = {
  TO_DO: 'bg-[#D7E2FF]',
  IN_PROGRESS: 'bg-[#CDDDFF]',
  BLOCKED: 'bg-[#FFDAD6]',
  IN_REVIEW: 'bg-[#FFFBE6]',
  READY_FOR_QA: 'bg-[#E2EEFF]',
  REOPENED: 'bg-[#FFE2E2]',
  READY_FOR_PRODUCTION: 'bg-[#E6F7EE]',
  DONE: 'bg-[#82F9BE]',
};

export const statusDotColors = {
  TO_DO: '#1A49A0',
  IN_PROGRESS: '#4867D6',
  BLOCKED: '#D62E0E',
  IN_REVIEW: '#D4A500',
  READY_FOR_QA: '#1A6BD6',
  REOPENED: '#D61A1A',
  READY_FOR_PRODUCTION: '#2EC46A',
  DONE: '#03A65A',
};

export const ITEMS_PER_PAGE = 1;
