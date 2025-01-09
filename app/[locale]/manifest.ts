import type { MetadataRoute } from 'next';

// TODO: Update the manifest with your own app details
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TOYZ',
    short_name: 'TOYZ',
    description: 'TOYZ is a counter-culture themed webzine',
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
