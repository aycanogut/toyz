import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
	messages: (await import(`./navigation/${locale}.json`)).default,
}))
