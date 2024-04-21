import React from 'react';
import { Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const MySelect = ({ control, name, label, options, rules, ...props }) => {
  const defaultValue = options.length > 0 ? options[0].value : '';  
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{mt:3, mb:1}} error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            onChange={onChange}
            inputRef={ref}            
            {...props}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default MySelect;
