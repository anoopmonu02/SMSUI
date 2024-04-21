import { TextField } from '@mui/material'
import React from 'react'

function MyTextField({
    label,
    type = "text",
    ...props
}, ref) {
  return (
    <TextField type={type} label={label} {...props} ref={ref} />
  )
}

export default React.forwardRef(MyTextField)