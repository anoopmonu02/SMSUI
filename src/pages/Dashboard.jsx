import React from 'react'
import SideNav from '../components/SideNav'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material';

function Dashboard() {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <SideNav />
        </Grid>
        <Grid item xs={9} sx={{p:5}}>
          <Outlet />
        </Grid>
    </Grid>
    </>
    
  )
}

export default Dashboard