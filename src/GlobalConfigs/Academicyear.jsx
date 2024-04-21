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
  import dayjs from 'dayjs';
  import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Academicyear() {
    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const enddt = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    const [selectedendDate, setSelectedendDate] = useState(dayjs(enddt));    

    const getData = () => {
        console.log("academicyear::::::", localStorage.getItem('access_token'));
        customaxios.get(`/api/v1/admin/academicyear`,{
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
        formState:{errors, isSubmitting},
    } = useForm();

    //Can use default values if needed
    /* useForm({
        defaultValues: {
            startdate: new Date(),
            enddate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }   
    }) */

    const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
            size: 50,
          },
          {
            accessorKey: 'session_startdate', //access nested data with dot notation
            header: 'Start Date',
            size: 100,
          },
          {
            accessorKey: 'session_enddate', //access nested data with dot notation
            header: 'End Date',
            size: 100,
          },
          {
            accessorKey: 'session_displayformat', //access nested data with dot notation
            header: 'Display Format',
            size: 100,
          },
          {
            accessorKey: 'session_description', //access nested data
            header: 'Description',
            size: 250,
          }
        ],
        [],
      );
    const messagetext = "Academic Year"; 

    const saveAcademicYear = async(data) => {
        setError("");
        try{
            console.log(data);
            
            const res = await customaxios.post('/api/v1/admin/academicyear/',{
                session_startdate: data.startdate,
                session_enddate: data.enddate,
                session_displayformat: data.displayformat,  
                session_description: data.description,
                branch: localStorage.getItem('branch')
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
            <form onSubmit={handleSubmit(saveAcademicYear)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>A</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' variant="outlined" color="error" startIcon={<AddIcon />}>Add</MyButton>                
                    </Box>

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker name="startdate" id="startdate" label="Start Date" 
                            size="small" type="Date"      
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}          
                            {...register("startdate", 
                            { required: "Start Date is required"})} />

                            <DatePicker  name="enddate" id="enddate" label="End Date" 
                            size="small" type="Date"      
                            selected={selectedendDate}
                            onChange={(date) => setSelectedendDate(date)}               
                            {...register("enddate", 
                            { required: "End Date is required"})} />
                        </DemoContainer>
                    </LocalizationProvider> */}

                    <MyTextField name="startdate" id="startdate" label="Start Date" 
                    size="small" type="Date"                     
                    {...register("startdate", 
                    { required: "Start Date is required"})} />

                    <MyTextField name="enddate" id="enddate" label="End Date" 
                    size="small" type="Date"                     
                    {...register("enddate", 
                    { required: "End Date is required"})} />

                    <MyTextField name="displayformat" id="displayformat" label="Display Format" 
                    placeholder="Add Display Format" size="small" type="text"                     
                    {...register("displayformat", 
                    { required: "Display format is required"})} />  

                    <MyTextField name="description" id="description" label="Description" 
                    placeholder="description" size="small" type="text"                     
                    {...register("description",{
                        maxLength: 255
                    })} />
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save"}</MyButton>
                    </Box>   
                    {errors.root && (
                        <p role="alert-error" style={{ color: 'red', fontSize: '10px' }}>{errors.root.message}</p>  
                    )}
                    {errors.discount && (
                        <p role="alert-error" style={{ color: 'red', fontSize: '10px' }}>{errors.discount.message}</p>  
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

export default Academicyear