import { type NavItemProps } from '@/types'

import { urls } from './urls'

export const navigation: NavItemProps[] = [
	{
		label: 'home',
		href: urls.Home,
	},
	{
		label: 'toyz',
		href: urls.Toyz,
	},
	{
		label: 'about',
		href: urls.About,
	},
	{
		label: 'contact',
		href: urls.Contact,
	},
]
