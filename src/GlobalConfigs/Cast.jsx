import React, {useEffect, useMemo, useState, useRef} from 'react';
import { Paper, Stack, Divider, Box, Avatar, Typography, Grid, Button, TextField, CssBaseline, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import MyTextField from '../components/MyTextField'
import { useForm} from 'react-hook-form'
import MyButton from '../components/MyButton';
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


function Cast() {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)
    const [options, setOptions] = useState([]);

    const getCategoryData = () => {
        console.log("category::::::", localStorage.getItem('access_token'));
        customaxios.get(`/api/v1/universal/category`,{
            headers: {
                'Content-Type': 'application/json'                
            }
        }).then((res) =>{
            const newOptions = res.data.map((item) => {
                return { value: item.id, label: item.category_name };
            });
            console.log("newOptions-------------------->>>-",newOptions)
            setOptions(newOptions);
        }).catch((error) => {
            console.log(error);
        });

        customaxios.get(`/api/v1/universal/cast`,{
            headers: {
                'Content-Type': 'application/json'                
            }
        }).then((res) =>{
            setMyData(res.data)
            setLoading(false)
        }).catch(error => {
            console.error('Error fetching casts', error);
          });
    }

    const getData = () => {
        
    }

    useEffect(() =>{
        getCategoryData()
        //getData()
    },[])

    const handleChange = (event) => {
        console.log("+_+_+_+_+",event.target);
        setSelectedValue(event.target.value);
    };

    

    const 
    {
        register, 
        setError, 
        handleSubmit, 
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
            accessorKey: 'cast_name', //access nested data with dot notation
            header: 'Cast Name',
            size: 150,
          },
          {
            accessorKey: 'category.category_name', //access nested data with dot notation
            header: 'Category',
            size: 150,
          },
        ],
        [],
      );

    const messagetext = "Cast";

    const savesection = async(data) => {
        setError("");
        try{
            console.log(data);
            const res = await customaxios.post('/api/v1/universal/cast/',{
                category: data.category,
                cast_name: data.cast
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
        <Paper xs={12} elevation={4} sx={{width: '600px', margin: '20px'}}>
            <form onSubmit={handleSubmit(savesection)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>C</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' variant="outlined" color="error" startIcon={<AddIcon />}>Add</MyButton>                
                    </Box>                    

                    <Box mb={2}>
                        <FormControl sx={{minWidth: 220 }}>
                            <InputLabel id="category-select-label">Category</InputLabel>
                            <Select
                            labelId="category-select-label"
                            id="category"
                            name='category'
                            label="Category"
                            onChange={handleChange}
                            size='small'
                            defaultValue='None'
                            {...register("category",{required: true})}
                            >
                            {options.map((option, index) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box>                    

                    <MyTextField name="cast" id="cast" label="Cast" 
                    placeholder="Add Cast" size="small" type="text"                     
                    {...register("cast", 
                    { required: "Cast is required"})} />
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save"}</MyButton>
                    </Box>   
                    {errors.root && (
                        <p role="alert-error" style={{ color: 'red', fontSize: '10px' }}>{errors.root.message}</p>  
                    )}
                    {errors.cast && (
                        <p role="alert-error" style={{ color: 'red', fontSize: '10px' }}>{errors.cast.message}</p>  
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

export default Cast