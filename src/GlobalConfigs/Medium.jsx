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
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';

function Medium() {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        console.log("Medium::::::", localStorage.getItem('access_token'));
        customaxios.get(`api/v1/universal/medium`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) =>{
            setMyData(res.data)
            console.log(res.data)
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
            accessorKey: 'medium_name', //access nested data with dot notation
            header: 'Medium Name',
            size: 250,
          },
        ],
        [],
      );

    const messagetext = "Medium";

    const savemedium = async(data) => {
        setError("");
        try{
            console.log(data);
            const res = await customaxios.post('api/v1/universal/medium/',{
                medium_name: data.medium
            })
            console.log("res ", res);
            getData();
        }catch(error){
            console.log(error);
            setError("root",{message: "error.message"});    
        }        
    };

  return (
    <> 
        <Paper xs={12} sx={{width: '600px', margin: '20px'}}>
            <form onSubmit={handleSubmit(savemedium)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>M</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' variant="outlined" color="error" startIcon={<AddIcon />}>Add</MyButton>                
                    </Box>

                    <MyTextField name="medium" id="medium" label="Medium" 
                    placeholder="Add Medium" size="small" type="text"                     
                    {...register("medium", 
                    { required: "Medium is required",
                    minLength:{
                        value: 3,
                        message: "Medium must be at least 3 characters"
                    } })} />
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save"}</MyButton>
                    </Box>   
                    {errors.root && (
                        <p role="alert-error" style={{ color: 'red', fontSize: '10px' }}>{errors.root.message}</p>  
                    )}
                    {errors.medium && (
                        <p role="alert-error" style={{ color: 'red', fontSize: '10px' }}>{errors.medium.message}</p>  
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

export default Medium