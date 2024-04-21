import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from "react-hook-form";

function SelectDropdown({
  name,
  label,
  control,
  defaultValue,
  children,
  id,
  ...props
}) {
  return (
    <FormControl fullWidth sx={{mt:3, mb:1}} {...props}>
      <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
      {/* <Select
        labelId={`${id}-select-label`}
        id={id}        
        label={label}
        ref={ref}
        {...props}
      >
        {options?.map((option, index) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select> */}
      <Controller
        as={
          <Select labelId={`${id}-select-label`} label={label}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  )
}

export default SelectDropdown