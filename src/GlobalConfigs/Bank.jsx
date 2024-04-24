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

function Bank() {
    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        console.log("bank::::::", localStorage.getItem('access_token'));
        customaxios.get(`/api/v1/universal/bank`,{
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

    const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
            size: 150,
          },
          {
            accessorKey: 'bank_name', //access nested data with dot notation
            header: 'Bank Name',
            size: 250,
          },
        ],
        [],
      );

    const messagetext = "Bank";

    const savebank = async(data) => {
        setError("");
        try{
            console.log(data);
            const res = await customaxios.post('/api/v1/universal/bank/',{
                bank_name: data.bank
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
            <form onSubmit={handleSubmit(savebank)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>B</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' variant="outlined" color="error" startIcon={<AddIcon />}>Add</MyButton>                
                    </Box>

                    <MyTextField name="bank" id="bank" label="Bank" 
                    placeholder="Add Bank" size="small" type="text"                     
                    {...register("bank", 
                    { required: "Bank name is required",
                    pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: 'Only letters are allowed and no special characters!'
                      },
                    minLength: {
                        value: 2,
                        message: 'Minimum 2 characters required'
                      }})} />
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save"}</MyButton>
                    </Box>   
                    {errors.bank && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.bank.message}
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

export default Bank