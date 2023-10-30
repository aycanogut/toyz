const withNextIntl = require('next-intl/plugin')('./i18n.ts')

module.exports = withNextIntl({
  images: {
    domains: [
      'johnsonconsulting.com',
      'images.ctfassets.net',
      'placehold.co',
      'freight.cargo.site',
    ],
  },
})
