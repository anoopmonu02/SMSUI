import React from 'react'
import { FormControl, MenuItem, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export const PrjSelectFields = ({
    label,    
    variant,  
    name,  
    options,
    control,
    sxVal,
    width,
    defaultValue = "",
    ...props
}) => {
    return (
        <Controller 
            name={name}
            control={control}
            defaultValue={defaultValue}            
            render={({ field }) => (
                <FormControl variant={variant} sx={{width:{width}}}>
                    <TextField {...field} select label={label} variant={variant} {...props}>
                        {options?.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>  
                </FormControl>
            )}
        />            
      )
}
