import { FormControl, TextField } from '@mui/material'
import React from 'react'

function PrjTextFields({
    label,    
    variant,
    inputProps,
    ...props
}) {
  return (
    <FormControl fullWidth sx={{mb: '1rem'}}>
        <TextField label={label} variant={variant} {...props}
        InputProps={inputProps}
        />
    </FormControl>
  )
}

export default PrjTextFields