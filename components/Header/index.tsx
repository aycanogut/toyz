import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { Box, List } from '@mantine/core'

import { type NavItemProps } from '@/types'

import classes from './index.module.css'

interface HeadaerProps {
  items: NavItemProps[]
}

function Header({ items }: HeadaerProps) {
  const t = useTranslations('Navigation')

  if (!items?.length) {
    return null
  }

  return (
    <Box
      component="header"
      className={classes.header}
    >
      <Box component="nav">
        <List className={classes.ul}>
          {items.map((item) => {
            return (
              item.href && (
                <li
                  key={item.label}
                  className={classes.li}
                >
                  <Link
                    href={item.href}
                    className={classes.link}
                  >
                    <Box
                      component="span"
                      className={classes.span}
                    >
                      {t(item.label)}
                    </Box>
                  </Link>
                </li>
              )
            )
          })}
        </List>
      </Box>
    </Box>
  )
}

export default Header
