interface NavigationItemProps {
  id: number;
  name: 'home' | 'about' | 'contact';
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
    name: 'about',
    path: '/about',
  },
  {
    id: 3,
    name: 'contact',
    path: '/contact',
  },
];

export default navigationItems;
