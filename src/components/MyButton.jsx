import { Button } from '@mui/material'
import React from 'react'

function MyButton({
    children,
    variant = "contained",
    color = "primary",
    ...props
}, ref) {
  return (
    <Button variant={variant} color={color} {...props} ref={ref}>{children}</Button>
  )
}

export default React.forwardRef(MyButton)