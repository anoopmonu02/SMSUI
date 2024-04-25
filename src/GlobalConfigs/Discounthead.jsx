import {React, useEffect, useMemo, useState} from 'react';
import { Paper, Stack, Divider, Box, Avatar, Typography, Grid, Button, TextField, CssBaseline } from '@mui/material'
import MyTextField from '../components/MyTextField'
import { useForm} from 'react-hook-form'
import MyButton from '../components/MyButton';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import customaxios from '../Axios/customaxios';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';

function Discounthead() {
    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        console.log("discounthead::::::", localStorage.getItem('access_token'));
        customaxios.get(`/api/v1/admin/discounthead`,{
            headers: {
                'Content-Type': 'application/json'                
            }
        }).then((res) =>{
            setMyData(res.data)
            console.log(res.data)
            //localStorage.setItem('branch',1)
            setLoading(false)
        })
    }

    useEffect(() =>{
        getData()
    },[])

    const 
    {
        register, 
        setError, 
        handleSubmit, 
        reset,
        formState:{errors, isSubmitting},
    } = useForm();

    /* Can use default values if needed
    useForm({
        defaultValues: {
            medium: "English"
        }   
    }) */

    const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
            size: 150,
          },
          {
            accessorKey: 'discount_name', //access nested data with dot notation
            header: 'Discounthead Name',
            size: 150,
          },
          {
            accessorKey: 'discount_description', //access nested data with dot notation
            header: 'Details',
            size: 250,
          },
        ],
        [],
      );

    const messagetext = "Discounthead"; 

    const savediscounthead = async(data) => {
        setError("");
        try{
            console.log(data);
            const res = await customaxios.post('/api/v1/admin/discounthead/',{
                discount_name: data.discounthead,
                discount_description: data.description,
                branch: localStorage.getItem('branch')
            })
            console.log("res ", res);
            getData();
            reset();
        }catch(error){
            console.log(error);
            setError("root",{message: error.response.data.detail});    
        }        
    };
  return (
    <> 
        <Paper xs={12} elevation={4} sx={{width: '600px', margin: '20px'}}>
            <form onSubmit={handleSubmit(savediscounthead)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>D</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' variant="outlined" color="error" startIcon={<AddIcon />}>Add</MyButton>                
                    </Box>

                    <MyTextField name="discounthead" id="discounthead" label="Discounthead" 
                    placeholder="Add Discounthead" size="small" type="text"                     
                    {...register("discounthead", 
                    { required: "Discounthead is required",
                    pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: 'Only letters are allowed and no special characters!'
                      },
                    minLength: {
                        value: 3,
                        message: 'Minimum 3 characters required'
                      }})} />

                    <MyTextField name="description" id="description" label="Description" 
                    placeholder="description" size="small" type="text"                     
                    {...register("description",{
                        maxLength: {
                            value: 200,
                            message: 'Maximum 200 characters allowed'
                        }
                    })} />
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save"}</MyButton>
                    </Box>   
                    {errors.discounthead && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.discounthead.message}
                        </Alert>
                    )}
                    {errors.description && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.description.message}
                        </Alert>
                    )}
                    {errors.root && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.root.message}
                        </Alert>
                    )}
                </Stack>
            </form>
            <div>
            { loading ? <p>Loading...</p> :
            <MaterialReactTable 
                columns={columns} 
                data={myData} 

                enableRowActions
                renderRowActions={({row}) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        
                        <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            
            
            />
            }            
        </div>
            
        </Paper>
    </>
    
  )
}

export default Discounthead