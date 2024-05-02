import React from 'react';
import { Controller } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function PrjDatePicker({
    label,
    name,
    control,
    size,
    requiredMsg,    
    ...props
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller 
        name={name}
        rules={{ required: requiredMsg }}
        control={control}
        defaultValue={null}
        render={({ field:{onChange, value}, formState }) => (
        <DatePicker label={label} value={value} onChange={onChange} format="DD/MM/YYYY" size={size} 
        slotProps={{ textField: { size: 'small' } }}
        />
        )}        
        />
      
    </LocalizationProvider>
  )
}

export default PrjDatePicker