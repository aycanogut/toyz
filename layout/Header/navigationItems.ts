interface NavigationItemProps {
  id: number;
  name: 'home' | 'events' | 'about' | 'contact';
  path: string;
}

const navigationItems: NavigationItemProps[] = [
  {
    id: 1,
    name: 'home',
    path: '/',
  },
  {
    id: 2,
    name: 'events',
    path: '/events',
  },
  {
    id: 3,
    name: 'about',
    path: '/about',
  },
  {
    id: 4,
    name: 'contact',
    path: '/contact',
  },
];

export default navigationItems;
