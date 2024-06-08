import React, {useState, useEffect, useMemo} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
  import { Paper, Stack, Divider, Box, Avatar, Typography, Grid, TextField, CssBaseline, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
  import { useForm, Controller, useFieldArray } from 'react-hook-form';
  import MyButton from '../components/MyButton';
  import { red } from '@mui/material/colors';
  import SaveOutlined from '@mui/icons-material/SaveOutlined';
  import customaxios from '../Axios/customaxios';
  import Button from '@mui/material/Button';
import { PrjSelectFields } from '../components/PrjSelectFields';
import { getAllFeeHeads, getGradeData } from '../utils/globalconfigsjs';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

function FeeMonthMap() {
    const messagetext = "Fee Month Mapping"
    const [loading, setLoading] = useState(true)
    const [myData, setMyData] = useState([])
    const [feeHeads, setFeeHeads] = useState([])
    const [feeHead, setFeeHead] = useState(null)


    const 
    {
        register, 
        setError, 
        handleSubmit, 
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm({});
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getFeeMonthMappingData = () =>{

    }

    const getData = async() => {      
        const access_token = localStorage.getItem('access_token');
        const branchid = localStorage.getItem('branch'); 
        getAllFeeHeads(access_token, branchid, setFeeHeads);        
        setLoading(false);        
    }

    useEffect(() =>{
        getData()
    },[])

    const saveFeeMonthMapping = async(data) => {

    }

  return (
    <>
        <Paper xs={12} elevation={4} sx={{width: '800px', margin: '20px'}}>
            <form onSubmit={handleSubmit(saveFeeMonthMapping)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>FM</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' variant="outlined" color="error" startIcon={<DeleteForeverIcon />}>Delete</MyButton>                                   
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box width="100%">                
                            <PrjSelectFields options={feeHeads} label="Fee Head" name="fee_head" sx={{minWidth: 240}}
                            width='100%' variant="outlined" size="small" control={control} onChange={getFeeMonthMappingData} value={feeHead}
                            defaultValue='' id='fee_head' />
                            
                        </Box>   
                        
                        
                        
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th width="50%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Fee Head</th>
                                <th width="50%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                        </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save Mapping"}</MyButton>
                    </Box>   
                    {errors.root && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.root.message}
                        </Alert>
                    )}
                </Stack>
            </form>
            <div>
            {/* { loading ? <p>Loading...</p> :
            <MaterialReactTable 
                columns={columns} 
                data={myData}            
            
            />
            }      */}       
        </div>
            
        </Paper>
    </>
  )
}

export default FeeMonthMap