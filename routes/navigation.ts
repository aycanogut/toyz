import { type NavItemProps } from '@/types'

import { urls } from './urls'

export const navigation: NavItemProps[] = [
	{
		label: 'Home',
		href: urls.Home,
	},
	{
		label: 'Toyz',
		href: urls.Toyz,
	},
	{
		label: 'About',
		href: urls.About,
	},
	{
		label: 'Contact',
		href: urls.Contact,
	},
]
