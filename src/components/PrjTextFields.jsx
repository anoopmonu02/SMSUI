import { FormControl, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

function PrjTextFields({
    label,    
    variant,
    control,
    name,
    inputProps,
    defaultValue = "",
    width,
    ...props
}) {
  return (
    <FormControl sx={{width:{width}}}>
        <Controller 
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField {...field} label={label} variant={variant} {...props}
          InputProps={inputProps} />
        )}
        />        
    </FormControl>
  )
}

export default PrjTextFields