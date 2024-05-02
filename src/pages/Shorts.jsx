import React, { useState,useEffect } from 'react';
import {Box, Paper, Stack, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Avatar,Grid,Typography,Divider,InputLabel, Button  } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { green, red} from '@mui/material/colors';
import MyButton from '../components/MyButton';
import FormHelperText from '@mui/material/FormHelperText';
import * as glist from '../utils/constatslist';
import { PrjSelectFields } from '../components/PrjSelectFields';
import { useForm } from 'react-hook-form';

import PrjTextFields from '../components/PrjTextFields';
import SelectDropdown from '../components/SelectDropdown';
import customaxios from '../Axios/customaxios';
import PrjDatePicker from '../components/PrjDatePicker';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import GroupHeader from '../components/GroupHeader';


import dayjs from 'dayjs';

function Shorts() {
  const [formData, setFormData] = useState({
    name: '',
    father_name: '',
    mother_name: '',
    gender: '',
    dob: '',
    category: '',
    cast: '',
    nationality: 'Indian',
    registration_no: '',
    registration_date: '',
    religion: '',
    father_occupation: '',
    mother_occupation: '',
    blood_group: '',
    height: 0,
    weight: 0,
    bodytype: '',
    address_permanent: '',
    landmark: '',
    province: '',
    city: '',
    pincode: '',
    mobile1: '',
    mobile2: '',
    email: '',
    previous_school_name: '',
    previous_class: '',
    passing_year: 0,
    tc_no: '',
    remarks: '',
    student_type: 'Old',
    guardian_name: '',
    relationship: '',
    guardian_contact: 'No Prefrence',
    grade: '',
    section: '',
    branch: '',
    medium: '',
    status_school: 'Own',
});

const [mediumList, setMediumList] = useState([]);
const [bankList, setBankList] = useState([]);
const [categoryList, setCategoryList] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [castList, setCastList] = useState([]);

const [provinceList, setProvinceList] = useState([]);
const [selectedProvince, setSelectedProvince] = useState("");
const [cityList, setCityList] = useState([]);

const [gradeList, setGradeList] = useState([]);
const [selectedGrade, setSelectedGrade] = useState("");
//const [cityList, setCityList] = useState([]);

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
const messagetext = "Student Registration";
const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    const formData = new FormData(event.target);
    console.log(formData);
};

const genderList = glist.genderList;
const bloodGroupList = glist.choicesOfBloodGroup;
const religionList = glist.choicesOfReligion;
const bodyTypeList = glist.choicesOfBodyType;
const relationshipList = glist.choicesOfRelationship;
const 
    {
        register, 
        setError,          
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm();

    /* const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }); */
    const currentDate = dayjs().format('DD/MM/YYYY');
    const formattedDate = dayjs().format('YYYYMMDDHHmmss');

    const getData = () => {
      customaxios.get(`api/v1/universal/category`,{
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.category_name };
        });
        setCategoryList(newOptions);
      }).catch((error) => {
          console.log(error);
      });

      //get provinnce list
      customaxios.get(`api/v1/universal/province`,{
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.province_name };
        });
        setProvinceList(newOptions);
      }).catch((error) => {
          console.log(error);
      });

      //get Medium list
      customaxios.get(`api/v1/universal/medium`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.medium_name };
        });
        setMediumList(newOptions);
      }).catch((error) => {
          console.log(error);
      });

      //get Bank list
      customaxios.get(`api/v1/universal/bank`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.bank_name };
        });
        setBankList(newOptions);
      }).catch((error) => {
          console.log(error);
      });

  }

  useEffect(() =>{
      getData()
  },[])

  // Load child data when selectedParent changes
  const doCastLoad = async(selectedCategory) => {
    if (selectedCategory) {
      console.log("Category selected, fetching casts...", selectedCategory)
      await customaxios.post(`api/v1/universal/casts/by-category/`,{        
        category_id: ""+selectedCategory
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.cast_name };
        });
        setCastList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
    }
  }

  useEffect(() => {
    doCastLoad(selectedCategory);
  }, [selectedCategory]);

  // Handle Category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


   // Load City data when Province changes
   const doCityLoad = async(selectedProvince) => {
    if (selectedProvince) {
      console.log("Province selected, fetching cities...", selectedProvince)
      await customaxios.get(`api/v1/universal/city/province/${selectedProvince}`)
      .then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.city_name };
        });
        setCityList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
    }
  }

  useEffect(() => {
    doCityLoad(selectedProvince);
  }, [selectedProvince]);

  // Handle Category selection
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, pr:2 }}>
      <Paper sx={{ p: 3, width: '100%' }}>
        <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor={green[100]}>        
            <Box display="flex" alignItems="center">
                <Avatar variant="rounded" sx={{ bgcolor: '#43a047' }}>SR</Avatar>
                <Box ml={2} >                  
                  <Typography variant="h5" component="h2" gutterBottom >
                    {messagetext}
                  </Typography>                  
                </Box>  
            </Box>
            <MyButton size='small' variant="contained" color="success" startIcon={<ListIcon />}>List Students</MyButton>                
        </Box>      
        <Divider />
        <form method='post' onSubmit={handleSubmit}>        
        {/* <Box 
          ml={2} 
          sx={{ 
            color: 'white', 
            background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
            padding: '10px', // Add some padding so the content isn't flush against the box edges
            borderRadius: '5px' // This makes the corners of the box rounded
          }}
        ><em>Personal Info</em></Box>  */} 
        <GroupHeader title="Personal Info" />  
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box mb={2}>
                  <PrjTextFields label="Registration Date" name='registration_date' id='registration_date' value={currentDate} readOnly size="small" InputLabelProps={{ shrink: true }} fullWidth={false}/>&nbsp;&nbsp;
                  <PrjTextFields label="Registration No" name='registration_no' size="small" value={formattedDate} readOnly InputLabelProps={{ shrink: true }}/>
                </Box>
                <Box mb={2}>
                    {/* <TextField label="Student's Name" name='name' size="small" fullWidth id="name"/> */}
                    <PrjTextFields label="Student's Name*" name='name' size="small" id="name" width='100%'/>
                </Box>
                <Box mb={2}><PrjTextFields label="Father's Name*" name='father_name' size="small" width='100%' /></Box>
                <Box mb={2}><PrjTextFields label="Mother's Name*" name='mother_name' size="small" width='100%' /></Box>
                <Box mb={2}></Box>                

                <Box mb={2}>
                  <PrjSelectFields 
                  options={categoryList} label="Category*" name="category" variant="outlined" size="small" 
                  width='45%' control={control} id='category' value={selectedCategory} onChange={handleCategoryChange}/>                  
                  &nbsp;&nbsp;
                  <PrjSelectFields 
                  options={castList} label="Cast*" name="cast" variant="outlined" size="small" width='45%'
                  control={control} defaultValue='' id='cast' />

                </Box>
              <Box mb={2}>                
                <PrjSelectFields options={religionList} label="Religion" name="religion" variant="outlined" size="small" sx={{minWidth: 120}} control={control} width='45%' defaultValue='No Preference'/>
              </Box>
              <Box mb={2}><PrjTextFields label="Comment" name='comments' size="small" width='100%' /></Box>
              <Box mb={2}>
                <TextField name='student_pic' size="small" type='file'/><FormHelperText>Upload Student Pic</FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={6}>
            
              <Box mb={2}><PrjDatePicker label="DOB" name='dob' control={control} size="small"  requiredMsg=""/></Box>
              <Box mb={2}><PrjTextFields label="Nationality*" name='nationality' readOnly size="small" defaultValue="Indian" value="Indian"/></Box>
              <Box mb={2}><PrjTextFields label="Father's Occupation" name='father_occupation' size="small"  /></Box>
              <Box mb={2}><PrjTextFields label="Mother's Occupation" name='mother_occupation' size="small"  /></Box>
              
              <PrjSelectFields options={genderList} label="Gender" name="gender" variant="outlined" size="small" sx={{minWidth: 120}} control={control} defaultValue="No Preference"/>
            </Grid>
          </Grid>
          {/* <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Physical Info</em></Box>  */}
          <GroupHeader title="Physical Info" />  
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Height" size="small" name='height' type="number" width='30%' /></Box>
              <Box mb={2}>
              <PrjSelectFields options={bloodGroupList} label="Blood Group" name="blood_group" width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} defaultValue="None"/>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Weight" name='weight' size="small" type="number" width='30%' /></Box>
              <Box mb={2}>
              <PrjSelectFields options={bodyTypeList} label="Body Type" name="bodytype" width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} defaultValue="Other"/>
              </Box>
            </Grid>
          </Grid>
          {/* <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Contact Info</em></Box>  */}
          <GroupHeader title="Contact Info" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Address" name='address_permanent' size="small" fullWidth width='100%'/></Box>
              <Box mb={2}>
              
              <PrjSelectFields options={provinceList} label="Province*" name="province" 
              width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
              value={selectedProvince} id='province' onChange={handleProvinceChange}/>
              </Box>
              <Box mb={2}><PrjTextFields label="Pincode" name='pincode' size="small"  /></Box>
              <Box mb={2}><PrjTextFields label="Mobile 1" name='mobile1' size="small"  />&nbsp;&nbsp;<PrjTextFields label="Mobile 2" name='mobile2' size="small"  /></Box>              
              <Box mb={2}><PrjTextFields type='email' label="Email" name='email' size="small" width="70%" /></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Landmark" name='landmark' size="small" /></Box>
              <Box mb={2}>
              <PrjSelectFields options={cityList} label="City*" name="city" 
              width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
              defaultValue='' id='city' />
              </Box>
            </Grid>
          </Grid>

          {/* <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Previous Academic Details</em></Box> */}
          <GroupHeader title="Previous Academic Details" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Previous School" size="small" id="previous_school_name" name='previous_school_name' width="100%"/></Box>
              <Box mb={2}>
                <PrjTextFields label="TC Number" size="small" id="tc_no" name='tc_no'/>&nbsp;&nbsp;
                <FormControl sx={{minWidth: 220 }}>
                <InputLabel id="student_type-select-label">Student Type</InputLabel>
                <Select
                  labelId="student_type-select-label"
                  id="student_type"
                  name='student_type'
                  label="Student Type"
                  onChange={handleChange}
                  size='small'
                  defaultValue={'Old'}
                >
                  <MenuItem value={'Old'}>Old</MenuItem>
                  <MenuItem value={'New'}>New</MenuItem>
                </Select>
              </FormControl>
              </Box>
              <Box mb={2}><PrjTextFields label="Remark" size="small" name='remarks' id="remarks" width="100%"/></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <PrjTextFields label="Previous Class" size="small" name='previous_class' id="previous_class"/>&nbsp;&nbsp;
                <PrjTextFields label="Passing Year" size="small" type='number' name='passing_year' id="passing_year" defaultValue={0}/>  
              </Box>
            </Grid>
          </Grid>

          {/* <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>In case of Emergency</em></Box> */}
          <GroupHeader title="In case of Emergency" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Person Name" size="small" id="guardian_name" name='guardian_name' width="100%"/></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <PrjTextFields label="Person Contact" size="small" id="guardian_contact" name='guardian_contact'/>&nbsp;&nbsp;                
              <PrjSelectFields options={relationshipList} label="Relationship" name="relationship" 
              width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
              defaultValue='No Preference' id='relationship' />
              </Box>
            </Grid>
          </Grid>

          {/* <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #0c2340 30%, #4a69bd 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(12, 35, 64, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Current Academic Details</em></Box> */}
          <GroupHeader title="Current Academic Details" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <FormControl sx={{minWidth: 220 }}>
                    <InputLabel id="grade-select-label">Class</InputLabel>
                    <Select
                      labelId="grade-select-label"
                      id="grade"
                      name='grade'
                      label="Class"
                      onChange={handleChange}
                      size='small'
                      defaultValue={'None'}
                    >
                      <MenuItem value={'None'}>None</MenuItem>
                    </Select>
                </FormControl>&nbsp;&nbsp;

                <FormControl sx={{minWidth: 220 }}>
                  <InputLabel id="section-select-label">Section</InputLabel>
                  <Select
                    labelId="section-select-label"
                    id="section"
                    name='section'
                    label="Section"
                    onChange={handleChange}
                    size='small'
                    defaultValue={'None'}
                  >
                    <MenuItem value={'None'}>None</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>                
                <PrjSelectFields options={mediumList} label="Medium*" name="medium" 
                width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
                defaultValue='1' id='medium' />
                &nbsp;&nbsp;

                <FormControl sx={{minWidth: 220 }}>
                  <InputLabel id="status_school-select-label">Status</InputLabel>
                  <Select
                    labelId="status_school-select-label"
                    id="status_school"
                    name='status_school'
                    label="Status"
                    onChange={handleChange}
                    size='small'
                    defaultValue={'Own'}
                  >
                    <MenuItem value={'Own'}>Own</MenuItem>
                    <MenuItem value={'Granted'}>Granted</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
              </FormControl>
                
              </Box>
            </Grid>
          </Grid>
          
          {/* <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          >
            <em>Aadhar and Bank Details</em>
          </Box> */}
          <GroupHeader title="Aadhar and Bank Details" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>                
                <PrjSelectFields options={bankList} label="Bank" name="bank" 
                width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
                defaultValue='1' id='bank' />
              </Box>
              <Box mb={2}><PrjTextFields label="Bank Branch" size="small" name='bank_branch' id="bank_branch" width='80%' control={control}/></Box>
              <Box mb={2}>
                <PrjTextFields label="Aadhar No." size="small" name='aadhar_no' id="aadhar_no" control={control}/>
              </Box>
              <Box mb={2}><TextField type='file' size="small" id="aadhar_front" name='aadhar_front' fullWidth/><FormHelperText>Aadhar Front</FormHelperText></Box>
              <Box mb={2}><TextField type='file' size="small" id="aadhar_back" name='aadhar_back' fullWidth/><FormHelperText>Aadhar Back</FormHelperText></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <PrjTextFields label="Account No." size="small" id="account_no" name='account_no' />
              </Box>
              <Box mb={2}><PrjTextFields label="IFSC Code" size="small" id="ifsc_code" name='ifsc_code' /></Box>
            </Grid>
          </Grid>
          <Divider  mt={2}/>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Box mb={2}>
                &nbsp;
              </Box>              
            </Grid>

            <Grid item xs={4}>
              <Box mb={2} mt={6}>
                <Button type='submit' variant="contained" endIcon={<SaveIcon />} color="success">
                  Save
                </Button>
                <Button sx={{marginLeft:'6px'}} type='button' variant="contained" endIcon={<ClearIcon />} color="warning">
                  Clear
                </Button>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box mb={2}>                
                &nbsp;                
              </Box>
            </Grid>
          </Grid>
          </form>  
        </Stack>
      </Paper>
    </Box>
);


};

export default Shorts