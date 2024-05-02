import { FormControl, TextField } from '@mui/material'
import React from 'react'

function PrjTextFields({
    label,    
    variant,
    inputProps,
    width,
    ...props
}) {
  return (
    <FormControl sx={{width:{width}}}>
        <TextField label={label} variant={variant} {...props}
        InputProps={inputProps}
        />
    </FormControl>
  )
}

export default PrjTextFields