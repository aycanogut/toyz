interface MockDataProps {
  id: number;
  title: string;
  image: string;
  items: ContentDetailsProps[];
  slug: string;
}

const mockData: MockDataProps[] = [
  {
    id: 1,
    title: 'Embark on a Mesmerizing Journey Through Time and Space with Obijuan GUANAHANI, Now Available on All Streaming Platforms',
    image: '/assets/card/card.svg',
    slug: 'obijuan-guanahani-now-available-on-all-streaming-platforms',
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
    title: 'Experience the Rocking Beats Saga with Obijuan GUANAHANI, Now Available on All Streaming Platforms',
    image: '/assets/card/card-2.svg',
    slug: 'obijuan-guanahani-now-available-on-all-streaming-platforms-2',
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
    title: 'Embark on an Artistic Journey with Graffiti Art Exploration - Obijuan GUANAHANI Now Available on All Streaming Platforms',
    image: '/assets/card/card-3.svg',
    slug: 'obijuan-guanahani-now-available-on-all-streaming-platforms-3',
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
    title: 'Immerse Yourself in the Harmony of Musical Notes with Obijuan GUANAHANI, Now Available on All Streaming Platforms',
    image: '/assets/card/card.svg',
    slug: 'obijuan-guanahani-now-available-on-all-streaming-platforms-4',
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
    title: 'Explore the Essence of Rock with Obijuan GUANAHANI, Now Available on All Streaming Platforms',
    image: '/assets/card/card-2.svg',
    slug: 'obijuan-guanahani-now-available-on-all-streaming-platforms-5',
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
    title: 'Unveil Urban Art - Join the Experience with Obijuan GUANAHANI, Now Available on All Streaming Platforms',
    image: '/assets/card/card-3.svg',
    slug: 'obijuan-guanahani-now-available-on-all-streaming-platforms-6',
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
