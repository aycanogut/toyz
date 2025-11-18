import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TOYZ – Independent Webzine on Skateboarding, Graffiti, Music & Underground Culture',
    short_name: 'TOYZ',
    description:
      'TOYZ is an independent webzine exploring skateboarding culture, graffiti, underground music, film, photography, and alternative art through scene-based stories and artist interviews.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161617',
    theme_color: '#858585',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '72x72',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
