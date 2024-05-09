import React, {useState, useEffect, useMemo} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
  import { Paper, Stack, Divider, Box, Avatar, Typography, Grid, TextField, CssBaseline } from '@mui/material'
  import { useForm, Controller } from 'react-hook-form';
  import MyButton from '../components/MyButton';
  import { red } from '@mui/material/colors';
  import SaveOutlined from '@mui/icons-material/SaveOutlined';
  import customaxios from '../Axios/customaxios';
  import { yupResolver } from '@hookform/resolvers/yup';
  import * as yup from 'yup';
  import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Alert } from '@mui/material';


  const schema = yup.object().shape({
    // Define validation rules for each month's priority
    January: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    February: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    March: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    April: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    May: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    June: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    July: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    August: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    September: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    October: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    November: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    December: yup.number().min(1, 'Priority must be greater than 0').max(12,'Priority must be less than 13').required(),
    // Repeat for other months...
  });

const defaultValues = {
    January: 1, 
    February: 2, 
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}
function MonthMapping() {
const messagetext = "Month Mapping"
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

const [myData, setMyData] = useState()
const [loading, setLoading] = useState(true)
const [open, setOpen] = React.useState(false);
const [formData, setFormData] = useState({});
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};


const getData = () => {
    const branch= localStorage.getItem('branch');
    const academicYear= localStorage.getItem('sessionid')
    customaxios.get(`/api/v1/admin/month-mapping/?branch=${branch}&academicYear=${academicYear}`,{
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

const [monthPriorities, setMonthPriorities] = useState(() => {
    // Initialize priorities with default values
    const initialPriorities = {};
    months.forEach(month => {
      initialPriorities[month] = 0;
    });
    return initialPriorities;
  });

  // Function to update priority for a specific month
  const updatePriority = (monthName, newPriority) => {
    setMonthPriorities(prevState => ({
      ...prevState,
      [monthName]: newPriority
    }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const 
    {
        register, 
        setError, 
        handleSubmit, 
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
      });
      
      const validateUniquePriorities = (data) => {
        const priorities = Object.values(data);
        const uniquePriorities = new Set(priorities);
        return priorities.length === uniquePriorities.size;
      };
    
    const saveMonthMapping = async(data) => {
        if (!validateUniquePriorities(data)) {
            alert('Two or more months cannot have the same priority');
            return;
          }
        console.log(data);
        setError("");
        const branch= localStorage.getItem('branch');
        const academicYear= localStorage.getItem('sessionid')        

        const transformedData = Object.entries(data).map(([monthName, priority]) => ({
            monthName,
            monthCode: monthName.slice(0, 3),
            branch: branch, // Assuming branch and academicYear are constant
            academicYear: academicYear, // Assuming branch and academicYear are constant
            priority
          }));
        
        console.log("-----------",transformedData);
        try{
            
            const res = await customaxios.post('/api/v1/admin/month-mapping/', transformedData)
            console.log("res ", res);           
            getData();
        }catch(error){
            console.log(error);
            setError("root",{message: error.response.data.detail});    
        } 
      };

      const handleConfirmMappingDelete = async() => {
        console.log('Mapping going to delete'); 
        setError("");
        setOpen(false);
        try{
            const branch= localStorage.getItem('branch');
            const academicYear= localStorage.getItem('sessionid')
            const requestData = { academicYear: academicYear, branch: branch };
            console.log("-----------");
            const res = await customaxios.delete('/api/v1/admin/month-mapping/',{ data: requestData })
            console.log("res ", res);           
            getData();
        }catch(error){
            console.log(error);
            setError("root",{message: error.response.data.detail});    
        }           
      };  

      


    const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
            size: 100,
          },
          {
            accessorKey: 'monthName', //access nested data with dot notation
            header: 'Month Name',
            size: 250,
          },
          {
            accessorKey: 'monthCode', //access nested data with dot notation
            header: 'Month Code',
            size: 100,
          },
          {
            accessorKey: 'academicYear_format', //access nested data with dot notation
            header: 'Academic Year',
            size: 100,
          },
          {
            accessorKey: 'priority',
            header: 'Priority',
            size: 100,
          },
        ],
        [],
      );

  return (
    <> 
        <Paper xs={12} elevation={4} sx={{width: '800px', margin: '20px'}}>
            <form onSubmit={handleSubmit(saveMonthMapping)}>
                <Stack spacing={4} p={4}>            
                    <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <Box display="flex" alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>MM</Avatar>
                            <Box ml={2}>{messagetext}</Box>  
                        </Box>
                        <MyButton size='small' onClick={handleClickOpen} variant="outlined" color="error" startIcon={<DeleteForeverIcon />}>Delete</MyButton>    
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                            {"Delete Confirmation?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this month mapping? This cannot be undone.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button size='small' variant='contained' autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button size='small' variant='contained' onClick={handleConfirmMappingDelete} autoFocus>
                                Agree
                            </Button>
                            </DialogActions>
                        </Dialog>        
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr sx={{bgcolor: red[200]}}>
                                <th width="25%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Month</th>
                                <th width="25%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Code</th>
                                <th width="50%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Priority</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(schema.fields).map(month => (
                                <tr key={month}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{month}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{month.substring(0,3)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'relative' }}>

                                        <Controller
                                            name={month}
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="number"
                                                        value={monthPriorities[month]}
                                                        onChange={(e) => updatePriority(month, parseInt(e.target.value))}
                                                        {...field}
                                                        style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                                                        min={0}
                                                        max={12}
                                                        disabled={isSubmitting}
                                                    />
                                                    {errors[month] && <p style={{ position: 'absolute', bottom: '-5px', color: 'red', margin: 0, fontSize: '12px' }}>{errors[month].message}</p>}
                                                </>                                                
                                            )}
                                        />
                                        <p style={{ margin: 0, height: '20px' }}>&nbsp;</p>
                                    </td>
                                </tr>
                            ))}
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
            { loading ? <p>Loading...</p> :
            <MaterialReactTable 
                columns={columns} 
                data={myData} 

                /* enableRowActions
                renderRowActions={({row}) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        
                        <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )} */
            
            
            />
            }            
        </div>
            
        </Paper>
    </>
  )
}

export default MonthMapping