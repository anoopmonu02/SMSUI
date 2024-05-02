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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PrjDatePicker from '../components/PrjDatePicker';
import { Alert } from '@mui/material';
import Dayjs from 'dayjs'

function Academicyear() {
    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const schema = yup.object().shape({
        startdate: yup
            .date()
            .required('Start Date is required')
            .typeError('Start Date must be a valid date'),
        enddate: yup
            .date()
            .required('End Date is required')
            .typeError('End Date must be a valid date')
            .min(yup.ref('startdate'), 'End Date must be greater than Start Date'),
        displayformat: yup
            .string()
            .required('Format is required'),
        description: yup
            .string()
            .max(200, 'Description must be maximum 200 characters')
    })

    const defaultValues = {
        displayformat: '',
        description: ''
    }

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
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm({defaultValues:defaultValues, resolver:yupResolver(schema)});

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
            //accessorKey: 'session_startdate', //access nested data with dot notation
            accessorFn: (row) => Dayjs(row.session_startdate).format("DD-MMM-YYYY"),
            header: 'Start Date',
            size: 100,
          },
          {
            //accessorKey: 'session_enddate', //access nested data with dot notation
            accessorFn: (row) => Dayjs(row.session_enddate).format("DD-MMM-YYYY"),
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
            const StartDate = Dayjs(data.startdate["$d"]).format("YYYY-MM-DD")
            const EndDate = Dayjs(data.enddate["$d"]).format("YYYY-MM-DD")
            const res = await customaxios.post('/api/v1/admin/academicyear/',{
                session_startdate: StartDate,
                session_enddate: EndDate,
                session_displayformat: data.displayformat,  
                session_description: data.description,
                branch: localStorage.getItem('branch')
            })
            console.log("res ", res);
            reset();
            getData();
        }catch(error){
            console.log(error);
            setError("root",{message: Object.values(error.response.data)[0]});    
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

                    

                    <PrjDatePicker name='startdate' id="startdate" label='Start Date*' control={control} size="small" requiredMsg="Start Date is required"/>
                    <PrjDatePicker name='enddate' id="enddate" label='End Date*' control={control} size="small" requiredMsg="End Date is required"/>

                    {/* <MyTextField name="startdate" id="startdate" label="Start Date" 
                    size="small" type="Date"                     
                    {...register("startdate", 
                    { required: "Start Date is required"})} />

                    <MyTextField name="enddate" id="enddate" label="End Date" 
                    size="small" type="Date"                     
                    {...register("enddate", 
                    { required: "End Date is required"})} /> */}

                    <MyTextField name="displayformat" id="displayformat" label="Display Format*" 
                    placeholder="Add Display Format" size="small" type="text"                     
                    {...register("displayformat")} />  

                    <MyTextField name="description" id="description" label="Description" 
                    placeholder="description" size="small" type="text"                     
                    {...register("description")} />
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <MyButton disabled={isSubmitting} fullWidth={false} ml={2} size='small' type="submit"
                        variant="contained" startIcon={<SaveOutlined />}>{isSubmitting?"Submitting...":"Save"}</MyButton>
                    </Box>   
                    {errors.startdate && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.startdate.message}
                        </Alert>
                    )}
                    {errors.enddate && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.enddate.message}
                        </Alert>
                    )}
                    {errors.displayformat && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.displayformat.message}
                        </Alert>
                    )}
                    {errors.description && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.description.message}
                        </Alert>
                    )}
                    {errors.Error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.Error.message}
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

export default Academicyear