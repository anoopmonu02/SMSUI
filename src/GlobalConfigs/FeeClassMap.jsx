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
import { getGradeData } from '../utils/globalconfigsjs';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

function FeeClassMap() {
    const messagetext = "Fee Class Mapping"
    const [loading, setLoading] = useState(true)
    const [myData, setMyData] = useState([])
    const [gradeList, setGradeList] = useState([]);
    const [grades, setGrades] = useState(null);
    const [feeheads, setFeeheads] = useState([]);
    const [feeAmounts, setFeeAmounts] = useState([]);
    const [formData, setFormData] = useState({});

    
    const 
    {
        register, 
        setError, 
        handleSubmit, 
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm({});
    
    const {
        fields,
        append,
        remove
      } = useFieldArray({
        control
      });
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
        setError("")
        reset();
        //setFeeheads([]);        
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
            "filterdata":"1"
        }
        await customaxios.get('/api/v1/admin/fee-class-mapping/',{
            params: qryData,
        },{

        })
        .then(response => {
            setFeeheads(response.data.fee_data);
            setMyData(response.data.table_data);
            console.log("grades", grades)
            console.log("fee heads", response.data);
        })
        .catch(error => {
        console.error('Error fetching fee heads:', error);
        });
        setLoading(false);
    }    
    
      const saveFeeClassMapping = async(data) => {
        console.log("data", data)
        console.log("Grades", grades)
        setError("");
        setLoading(true);
        const branch= localStorage.getItem('branch');
        const academicYear= localStorage.getItem('sessionid');
        const fee_class_map_data = {
            "branch": branch, // Assuming branch and academicYear are constant
            "academicYear": academicYear, // Assuming branch and academicYear are constant
            "grade": grades
        };
        let fee_class_amount_map_data = Object.entries(data).map(([feeheadid, amount]) => ({
            /* if(feeheadid.startsWith("FeeHead_")) {
                feeheadid = feeheadid.slice(8)
            } */
            "feehead" : feeheadid.startsWith("FeeHead_") && feeheadid!=='grade'?feeheadid.slice(8):'',            
            amount,            
          })); 
        fee_class_amount_map_data = fee_class_amount_map_data.filter(item=>item.feehead.trim()!=='')          
        console.log("-----------",fee_class_amount_map_data);  
        const transformedData = {
            "branch": branch, // Assuming branch and academicYear are constant
            "academicYear": academicYear, // Assuming branch and academicYear are constant
            "grade": grades,
            "fee_class_map": fee_class_map_data,
            "fee_class_amount_map_fee_class": fee_class_amount_map_data
        };
        try {
            console.log("Transformed Data:", transformedData);
            const res = await customaxios.post('/api/v1/admin/fee-class-mapping/', transformedData);
            if(res){
                alert('Fee Class Mapping saved successfully');
                setMyData(res.data)
            }
            getData();
            reset();
            setLoading(false);
        } catch (error) {
            
        }
    }   

      const handleAmountChange = (e) => {
        const { name, value } = e.target;
        setFeeAmounts(prevState => ({
          ...prevState,
          [name]: value
        }));
        setFormData({ ...formData, [name]: value });
        console.log("formData", formData);
        console.log("feeAmounts", feeAmounts);
      };
      const columns = useMemo(
        () => [
          /* {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
            size: 100,
          }, */
          {
            accessorKey: 'grade', //access nested data with dot notation
            header: 'Grade',
            size: 150,
          },
          {
            accessorKey: 'fee_head', //access nested data with dot notation
            header: 'Fee Name',
            size: 250,
          },
          {
            accessorKey: 'amount', //access nested data with dot notation
            header: 'Amount',
            size: 100,
          },
          /* {
            accessorKey: 'academicYear_format', //access nested data with dot notation
            header: 'Academic Year',
            size: 100,
          },
          {
            accessorKey: 'priority',
            header: 'Priority',
            size: 100,
          }, */
        ],
        [],
      );

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
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{feeHead.feename? feeHead.feename: feeHead.head_name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                   {/*  {feeHead.head_name && feeHead.amount>0 && feeHead.amount !== undefined && feeHead.amount !== null ?(
                                        <input type='number' name={feeHead.feehead} {...register(`${feeHead.feehead}`)} min={0} onChange={handleAmountChange}  disabled={isSubmitting}                                     
                                        value={feeHead.amount}/>
                                    ):(
                                        <input type='number' name={feeHead.feehead} {...register(`${feeHead.feehead}`)} min={0} onChange={handleAmountChange}  disabled={isSubmitting}
                                        />
                                    )} */}
                                    <input
                                        type="number"
                                        id={feeHead.feehead}
                                        {...register(`FeeHead_${feeHead.feehead}`)}
                                        defaultValue={feeHead.amount ? feeHead.amount : ''}
                                        min={0}
                                        disabled={isSubmitting}
                                        style={{
                                            width: '100px',  // Example width
                                            padding: '8px',  // Example padding
                                            border: '2px solid #ccc',  // Example border
                                            borderRadius: '4px',  // Example border radius
                                            // Add more CSS properties as needed
                                        }}
                                    />

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