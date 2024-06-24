import React, { useState, useEffect, useMemo } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper, Stack, Box, Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import MyButton from '../components/MyButton';
import { red } from '@mui/material/colors';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import customaxios from '../Axios/customaxios';
import { PrjSelectFields } from '../components/PrjSelectFields';
import { getAllFeeHeads } from '../utils/globalconfigsjs';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

function FeeMonthMap() {
  const messagetext = "Fee Month Mapping";
  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState([]);
  const [feeHeads, setFeeHeads] = useState([]);
  const [feeHead, setFeeHead] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});

  const {
    register,
    setError,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({});

  const getFeeMonthMappingData = async (e) => {
    setError("");
    reset();
    setFeeHead(e.target.value);
    console.log("feeheads: " + feeHead + "  val:" + e.target.value);
    try {
      const qryData = {
        branch: localStorage.getItem('branch'),
        academicYear: localStorage.getItem('sessionid'),
        feeHead: e.target.value,
      };
      await customaxios.get('/api/v1/admin/fee-month-map', {
        params: qryData,
      })
        .then(response => {
          const monthsData = response.data;
          setMyData(monthsData);
          const initialCheckboxStates = monthsData.reduce((acc, month) => {
            acc[`Month_${month.month_id}`] = month.is_checked;
            return acc;
          }, {});
          setCheckboxStates(initialCheckboxStates);
          console.log("fee heads", response.data.months_data);
        })
        .catch(error => {
          console.error('Error fetching fee month mapping:', error);
        });
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Fetch error:", error);
    }
  };

  const getData = async () => {
    const access_token = localStorage.getItem('access_token');
    const branchid = localStorage.getItem('branch');
    getAllFeeHeads(access_token, branchid, setFeeHeads);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (feeHead !== null) {
      console.log("feeheads: " + feeHead); // This will run after feeHead changes
    }
  }, [feeHead]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const saveFeeMonthMapping = async (data) => {
    const checkedItems = Object.entries(checkboxStates)
      .filter(([key, value]) => value)
      .map(([key]) => key.replace('Month_', ''));
    console.log('Checked items:', checkedItems);

    const branch = localStorage.getItem('branch');
    const academicYear = localStorage.getItem('sessionid');
    /* const feeMonthMapData = Object.entries(checkboxStates).map(([key, value]) => ({
        month: key.replace('Month_', ''),
        is_applicable: value
    })); */

    const requestData = {
        branch,
        academicYear,
        feeHead,
        checkedItems
    };
    console.log("Data::::: ", requestData);

    // Add your API call here to save the fee month mapping
    //await customaxios.post('/api/v1/admin/fee-month-map', requestData);
    try {
        const res = await customaxios.post('/api/v1/admin/fee-month-map/', requestData);
        if(res){
            alert('Fee Month Mapping saved successfully');
            setMyData(res.data)
        }
        getData();
        reset();
        setLoading(false);
    } catch (error) {
        console.log("error: "+error);
        setError("root",{message: error.response.data.detail});    
    }

  };

  const columns = useMemo(
    () => [      
      {
        accessorKey: 'feeHead', //access nested data with dot notation
        header: 'Fee Name',
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
    ],
    [],
  );

  return (
    <>
      <Paper xs={12} elevation={4} sx={{ width: '800px', margin: '20px' }}>
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
                <PrjSelectFields options={feeHeads} label="Fee Head" name="fee_head" sx={{ minWidth: 240 }}
                  width='100%' variant="outlined" size="small" control={control} onChange={getFeeMonthMappingData} value={feeHead}
                  defaultValue='' id='fee_head' />
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th width="10%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>SNo</th>
                    <th width="65%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Month Name</th>
                    <th width="25%" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Applicable</th>
                  </tr>
                </thead>
                <tbody>
                  {myData.map((data, index) => (
                    <tr key={data.month_name}>
                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{data.month_name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                        <input
                          type="checkbox"
                          name={`Month_${data.month_id}`}
                          checked={checkboxStates[`Month_${data.month_id}`] || false}
                          onChange={handleCheckboxChange}
                          disabled={isSubmitting}
                          style={{
                            width: '100px',  // Example width
                            padding: '8px',  // Example padding
                            border: '2px solid #ccc',  // Example border
                            borderRadius: '4px',  // Example border radius
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
                variant="contained" startIcon={<SaveOutlined />}>{isSubmitting ? "Submitting..." : "Save Mapping"}</MyButton>
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
  );
}

export default FeeMonthMap;
