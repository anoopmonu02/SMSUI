import React from 'react';
import { Typography, Box } from '@mui/material';

function GroupHeader({ title }) {
  return (
    <Box mb={3} mt={3} >
    <Typography variant="h5" component="h2" gutterBottom >
      {title}
    </Typography>
  </Box>
  );
}

export default GroupHeader;