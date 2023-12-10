'use client'

import {
  Select as SelectMantine,
  SelectProps as SelectMantineProps,
} from '@mantine/core'

interface SelectProps extends SelectMantineProps {
  categories: string[]
  label: string
  placeholder: string
}

function Select({ categories, label, placeholder, ...props }: SelectProps) {
  return (
    <SelectMantine
      data={categories}
      label={label}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Select
