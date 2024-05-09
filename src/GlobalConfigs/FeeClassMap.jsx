import React, {useState, useEffect, useMemo} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
  import { Paper, Stack, Divider, Box, Avatar, Typography, Grid, TextField, CssBaseline, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
  import { useForm, Controller } from 'react-hook-form';
  import MyButton from '../components/MyButton';
  import { red } from '@mui/material/colors';
  import SaveOutlined from '@mui/icons-material/SaveOutlined';
  import customaxios from '../Axios/customaxios';
  import Button from '@mui/material/Button';
import { PrjSelectFields } from '../components/PrjSelectFields';
import { getGradeData } from '../utils/globalconfigsjs';
import * as yup from 'yup';

function FeeClassMap() {
    const messagetext = "Fee Class Mapping"
    const [loading, setLoading] = useState(true)
    const [myData, setMyData] = useState([])
    const [gradeList, setGradeList] = useState([]);
    const [grades, setGrades] = useState(null);
    const [feeheads, setFeeheads] = useState([]);

    const [validationSchema, setValidationSchema] = useState(yup.object().shape({}));
    const 
    {
        register, 
        setError, 
        handleSubmit, 
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm();
    

    const getData = () => {      
        const access_token = localStorage.getItem('access_token');
        const branchid = localStorage.getItem('branch');        
        getGradeData(access_token, branchid, setGradeList);
        
    }
  
    useEffect(() =>{
        getData()
    },[])

    useEffect(() => {
        console.log("grades>>> ", grades); 
        // Use the updated state here

      }, [grades]);

    const getFeeClassMappingData = async(e) =>{
        const selectedGrade = e.target.value
        console.log("selectedGrade:>>>> ", selectedGrade)
        setGrades(selectedGrade);
        console.log("getting feeclassmapping data:",e.target.value)
        console.log("selectedGrade: ", grades)
         // Fetch fee heads from API
        const qryData = {
            "grade": selectedGrade,
            "branch": localStorage.getItem('branch'),
            "academicYear": localStorage.getItem('sessionid'),
        }
        await customaxios.get('/api/v1/admin/fee-class-mapping/',{
            params: qryData,
        })
        .then(response => {
            setFeeheads(response.data);
            //setGrades(selectedGrade);
            console.log("grades", grades)
            console.log("fee heads", response.data);
        })
        .catch(error => {
        console.error('Error fetching fee heads:', error);
        });
    }

    useEffect(() => {
        let schema = {};
        feeheads.forEach(field => {
            console.log("field", field);
            schema[field.amount] = yup.number().required(`${field.amount} is required`);
        // You can add more validation rules here as needed
        });
        setValidationSchema(yup.object().shape(schema));
      }, [feeheads]);
    
      const saveFeeClassMapping = (data) => {
        console.log("data", data)
        console.log("Grades", grades)
        setError("");
        const branch= localStorage.getItem('branch');
        const academicYear= localStorage.getItem('sessionid');
        const transformedData = Object.entries(data).map(([feename, amount]) => ({
            feename,
            branch: branch, // Assuming branch and academicYear are constant
            academicYear: academicYear, // Assuming branch and academicYear are constant
            amount
          }));  
        console.log("-----------",transformedData);  
    }

  return (
    <>
        <Paper xs={12} elevation={4} sx={{width: '800px', margin: '20px'}}>
            <form onSubmit={handleSubmit(saveFeeClassMapping)}>
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
                            <PrjSelectFields options={gradeList} label="Grade" name="grade" sx={{minWidth: 240}}
                            width='100%' variant="outlined" size="small" control={control} onChange={getFeeClassMappingData} value={grades}
                            defaultValue='' id='grade' />
                            
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
                            {feeheads.map(feeHead => (
                                <tr key={feeHead.feehead}>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{feeHead.feename}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                    {/* <input type="number" value={feeHead?.amount} onChange={(e) => handleAmountChange(e, feeHead.feehead)} /> */}

                                    <Controller
                                            name={feeHead.feename}
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="number"
                                                        value={feeHead?.amount}
                                                        onChange={(e) => handleAmountChange(e, feeHead.feehead)}
                                                        {...field}
                                                        style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                                                        min={0}
                                                        disabled={isSubmitting}
                                                    />
                                                    {errors[feeHead.feename] && <p style={{ position: 'absolute', bottom: '-5px', color: 'red', margin: 0, fontSize: '12px' }}>{errors[feeHead.feename].message}</p>}
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

export default FeeClassMap