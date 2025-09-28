import React from 'react'

type Props = {
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const Divider: React.FC<Props> = ({ width = 'md', className = '' }) => {
  const baseStyles = 'mx-auto h-[2px] bg-gray-200'
  
  const widths = {
    xs: 'w-16',
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-48',
    xl: 'w-[95%]',
    full: 'w-full'
  }

  return (
    <div className={`${baseStyles} ${widths[width]} ${className}`} />
  )
}

export default Divider