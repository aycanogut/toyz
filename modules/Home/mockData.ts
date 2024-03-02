interface MockDataProps {
  id: number;
  title: string;
  image: string;
  items: ArticleDetailsProps[];
}

const mockData: MockDataProps[] = [
  {
    id: 1,
    title: 'Obijuan GUANAHANI, now available on all streaming platforms',
    image: '/assets/card/card.svg',
    items: [
      {
        icon: 'calendar',
        label: '12.12.2023',
      },
      {
        icon: 'tag',
        label: '#music #electronic',
      },
      {
        icon: 'user',
        label: 'Aycan Öğüt',
      },
    ],
  },
  {
    id: 2,
    title: 'Obijuan GUANAHANI, now available on all streaming platforms',
    image: '/assets/card/card-2.svg',
    items: [
      {
        icon: 'calendar',
        label: '15.12.2024',
      },
      {
        icon: 'tag',
        label: '#rock',
      },
    ],
  },
  {
    id: 3,
    title: 'Obijuan GUANAHANI, now available on all streaming platforms',
    image: '/assets/card/card-3.svg',
    items: [
      {
        icon: 'calendar',
        label: '15.12.2024',
      },
      {
        icon: 'tag',
        label: '#graffiti',
      },
      {
        icon: 'user',
        label: 'Doğa Terror',
      },
    ],
  },
  {
    id: 4,
    title: 'Obijuan GUANAHANI, now available on all streaming platforms',
    image: '/assets/card/card.svg',
    items: [
      {
        icon: 'calendar',
        label: '12.12.2023',
      },
      {
        icon: 'tag',
        label: '#music',
      },
      {
        icon: 'user',
        label: 'Aycan Öğüt',
      },
    ],
  },
  {
    id: 5,
    title: 'Obijuan GUANAHANI, now available on all streaming platforms',
    image: '/assets/card/card-2.svg',
    items: [
      {
        icon: 'calendar',
        label: '15.12.2024',
      },
      {
        icon: 'tag',
        label: '#rock',
      },
    ],
  },
  {
    id: 6,
    title: 'Obijuan GUANAHANI, now available on all streaming platforms',
    image: '/assets/card/card-3.svg',
    items: [
      {
        icon: 'calendar',
        label: '15.12.2024',
      },
      {
        icon: 'tag',
        label: '#graffiti',
      },
      {
        icon: 'user',
        label: 'Doğa Terror',
      },
    ],
  },
];

export default mockData;
