'use client'

import { Box } from '@mantine/core'

import { usePathname, useRouter } from 'next-intl/client'

import classes from './index.module.css'

interface LocaleProps {
  label: string
}

interface LanguagePickerProps {
  locales: LocaleProps[]
}

function LanguagePicker({ locales }: LanguagePickerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e: any) => {
    router.push(pathname, { locale: e.target.innerText })
  }

  return (
    <Box className={classes.wrapper}>
      {locales.map((item: LocaleProps) => {
        return (
          <Box
            component="span"
            key={item.label}
            onClick={handleChange}
            onKeyDown={handleChange}
            className="cursor-pointer font-golos"
          >
            <span className={classes.label}>{item.label}</span>
          </Box>
        )
      })}
    </Box>
  )
}

export default LanguagePicker
