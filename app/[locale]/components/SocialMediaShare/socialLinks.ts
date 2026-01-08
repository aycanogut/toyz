interface SocialLinkProps {
  name: IconLabelProps;
  hoverColor: string;
  translationKey: string;
  getUrl: (url: string, title: string) => string;
}

const socialLinks: SocialLinkProps[] = [
  {
    name: 'facebook',
    hoverColor: 'hover:bg-social-facebook',
    translationKey: 'share-facebook',
    getUrl: url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'whatsapp',
    hoverColor: 'hover:bg-social-whatsapp',
    translationKey: 'share-whatsapp',
    getUrl: url => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: 'telegram',
    hoverColor: 'hover:bg-social-telegram',
    translationKey: 'share-telegram',
    getUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'reddit',
    hoverColor: 'hover:bg-social-reddit',
    translationKey: 'share-reddit',
    getUrl: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: 'bluesky',
    hoverColor: 'hover:bg-social-bluesky',
    translationKey: 'share-bluesky',
    getUrl: url => `https://bsky.app/intent/compose?text=${encodeURIComponent(url)}`,
  },
  {
    name: 'mastodon',
    hoverColor: 'hover:bg-social-mastodon',
    translationKey: 'share-mastodon',
    getUrl: url => `https://mastodon.social/share?text=${encodeURIComponent(url)}`,
  },
];

export default socialLinks;
