import React, { useState } from 'react';
import {Box, Paper, Stack, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Avatar,Grid,Typography,Divider,InputLabel  } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { red} from '@mui/material/colors';
import MyButton from '../components/MyButton';
import FormHelperText from '@mui/material/FormHelperText';
import * as glist from '../utils/constatslist';
import { PrjSelectFields } from '../components/PrjSelectFields';
import { useForm } from 'react-hook-form';

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
    console.log(formData);
};

const genderList = glist.genderList;
const bloodGroupList = glist.choicesOfBloodGroup;
const religionList = glist.choicesOfReligion;
const bodyTypeList = glist.choicesOfBodyType;
const relationshipList = glist.choicesOfRelationship;
console.log("R: ",religionList);
const 
    {
        register, 
        setError,          
        reset,
        control,
        formState:{errors, isSubmitting},
    } = useForm();

    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const formattedDate = dayjs().format('YYYYMMDDHHmmss');

return (
    <Box component="form" sx={{ display: 'flex', justifyContent: 'center', p: 1, pr:2 }}>
      <Paper sx={{ p: 3, width: '100%' }}>
        <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">        
            <Box display="flex" alignItems="center">
                <Avatar variant="rounded" sx={{ bgcolor: red[500] }}>SR</Avatar>
                <Box ml={2}>{messagetext}</Box>  
            </Box>
            <MyButton size='small' variant="outlined" color="error" startIcon={<ListIcon />}>List Students</MyButton>                
        </Box>        
        <Box 
          ml={2} 
          sx={{ 
            color: 'white', 
            background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
            padding: '10px', // Add some padding so the content isn't flush against the box edges
            borderRadius: '5px' // This makes the corners of the box rounded
          }}
        ><em>Personal Info</em></Box>    
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box mb={2}>
                  <TextField label="Registration Date" name='registration_date' id='registration_date' value={currentDate} readOnly size="small" InputLabelProps={{ shrink: true }} />&nbsp;&nbsp;
                  <TextField label="Registration No" name='registration_no' size="small" value={formattedDate} readOnly InputLabelProps={{ shrink: true }}/>
                </Box>
                <Box mb={2}>
                    <TextField label="Student's Name" name='name' size="small" fullWidth id="name"/>
                </Box>
                <Box mb={2}><TextField label="Father's Name" name='father_name' size="small" fullWidth /></Box>
                <Box mb={2}><TextField label="Mother's Name" name='mother_name' size="small" fullWidth /></Box>
                <Box mb={2}></Box>                

                <Box mb={2}>
                  <FormControl sx={{minWidth: 120}}>
                    <InputLabel id="Category-select-label">Category</InputLabel>
                    <Select defaultValue={'No Preference'} size="small"
                    labelId='Category-select-label'
                    id='category'
                    name='category'
                    label="Category"
                    >                  
                      <MenuItem value={"No Preference"}>No Preference</MenuItem>
                    </Select>
                  </FormControl>&nbsp;&nbsp;

                  <FormControl sx={{minWidth: 120}}>
                  <InputLabel id="Cast-select-label">Cast</InputLabel>
                    <Select defaultValue={"No Preference"} size="small"
                    labelId='Cast-select-label'
                    id='cast'
                    name='cast'
                    label="Cast"
                    > 
                      <MenuItem value={"No Preference"}>No Preference</MenuItem>                 
                    </Select>
                  </FormControl>

                </Box>
              <Box mb={2}>                
                <PrjSelectFields options={religionList} label="Religion" name="religion" variant="outlined" size="small" sx={{minWidth: 120}} control={control}/>
              </Box>
              <Box mb={2}><TextField label="Comment" name='comments' size="small" fullWidth /></Box>
              <Box mb={2}>
                <TextField name='student_pic' size="small" type='file'/><FormHelperText>Upload Student Pic</FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={6}>
            
              <Box mb={2}><TextField label="DOB" name='dob' type="date" size="small" InputLabelProps={{ shrink: true }} /></Box>
              <Box mb={2}><TextField label="Nationality" name='nationality' size="small" defaultValue="Indian" /></Box>
              <Box mb={2}><TextField label="Father's Occupation" name='father_occupation' size="small"  /></Box>
              <Box mb={2}><TextField label="Mother's Occupation" name='mother_occupation' size="small"  /></Box>
              {/* <FormControl >
                <Box mb={2}><FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row size="small" name='gender' defaultValue="No Preference">
                  <FormControlLabel value="Male" control={<Radio size="small"/>} label="Male" />
                  <FormControlLabel value="Female" control={<Radio size="small"/>} label="Female" />
                  <FormControlLabel value="Others" control={<Radio size="small"/>} label="Others" />
                  <FormControlLabel value="No Preference" checked control={<Radio size="small"/>} label="No Preference" />
                </RadioGroup>
                </Box>
              </FormControl> */}
              <PrjSelectFields options={genderList} label="Gender" name="gender" variant="outlined" size="small" sx={{minWidth: 120}} control={control} defaultValue="No Preference"/>
            </Grid>
          </Grid>
          <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Physical Info</em></Box> 
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><TextField label="Height" size="small" name='height'/></Box>
              <Box mb={2}>
              <FormControl sx={{minWidth: 120 }}>
                <InputLabel id="blood_group-select-label">Blood Group</InputLabel>
                <Select
                  labelId="blood_group-select-label"
                  id="blood_group"
                  label="Blood Group"
                  name='blood_group'
                  onChange={handleChange}
                  size='small'
                  defaultValue={'No Preference'}
                >
                  <MenuItem value={'No Preference'}>No Preference</MenuItem>
                  <MenuItem value={'A+'}>A+</MenuItem>
                  <MenuItem value={'A-'}>A-</MenuItem>
                  <MenuItem value={'O+'}>O+</MenuItem>
                  <MenuItem value={'O-'}>O-</MenuItem>
                  <MenuItem value={'B+'}>B+</MenuItem>
                  <MenuItem value={'B-'}>B-</MenuItem>
                  <MenuItem value={'AB+'}>AB+</MenuItem>
                  <MenuItem value={'AB-'}>AB-</MenuItem>
                </Select>
                <FormHelperText>Select blood group</FormHelperText>
              </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}><TextField label="Weight" name='weight' size="small" /></Box>
              <Box mb={2}>
              <FormControl sx={{minWidth: 220 }}>
                <InputLabel id="bodytype-select-label1">Body Type</InputLabel>
                <Select
                  labelId="bodytype-select-label1"
                  id="bodytype"
                  name='bodytype'
                  label="Body Type"
                  onChange={handleChange}
                  size='small'
                  defaultValue={'Normal'}
                >
                  <MenuItem value={'Normal'}>Normal</MenuItem>
                  <MenuItem value={'Blind'}>Blind</MenuItem>
                  <MenuItem value={'Physically Challenged'}>Physically Challenged</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
                <FormHelperText>Select body type</FormHelperText>
              </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Contact Info</em></Box> 
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><TextField label="Address" name='address_permanent' size="small" fullWidth /></Box>
              <Box mb={2}>
              <FormControl sx={{minWidth: 220 }}>
                <InputLabel id="province-select-label1">State</InputLabel>
                <Select
                  labelId="province-select-label1"
                  id="province"
                  name='province'
                  label="Province"
                  onChange={handleChange}
                  size='small'
                  defaultValue={'None'}
                >
                  <MenuItem value={'None'}>None</MenuItem>
                </Select>
              </FormControl>
              </Box>
              <Box mb={2}><TextField label="Pincode" name='pincode' size="small"  /></Box>
              <Box mb={2}><TextField label="Mobile 1" name='mobile1' size="small"  />&nbsp;&nbsp;<TextField label="Mobile 2" name='mobile2' size="small"  /></Box>              
              <Box mb={2}><TextField type='email' label="Email" name='email' size="small" fullWidth /></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}><TextField label="Landmark" name='landmark' size="small" /></Box>
              <Box mb={2}>
              <FormControl sx={{minWidth: 220 }}>
                <InputLabel id="city-select-label1">City</InputLabel>
                <Select
                  labelId="city-select-label1"
                  id="city"
                  name='city'
                  label="City"
                  onChange={handleChange}
                  size='small'
                  defaultValue={'None'}
                >
                  <MenuItem value={'None'}>None</MenuItem>
                </Select>
              </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Previous Academic Details</em></Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><TextField label="Previous School" size="small" id="previous_school_name" name='previous_school_name' fullWidth/></Box>
              <Box mb={2}>
                <TextField label="TC" size="small" id="tc_no" name='tc_no'/>&nbsp;&nbsp;
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
              <Box mb={2}><TextField label="Remark" size="small" name='remarks' id="remarks" fullWidth/></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <TextField label="Previous Class" size="small" name='previous_class' id="previous_class"/>&nbsp;&nbsp;
                <TextField label="Passing Year" size="small" type='number' name='passing_year' id="passing_year" defaultValue={0}/>  
              </Box>
            </Grid>
          </Grid>

          <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>In case of Emergency</em></Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}><TextField label="Person Name" size="small" id="guardian_name" name='guardian_name' fullWidth/></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <TextField label="Person Contact" size="small" id="guardian_contact" name='guardian_contact'/>&nbsp;&nbsp;
                <FormControl sx={{minWidth: 220 }}>
                  <InputLabel id="relationship-select-label">Relationship</InputLabel>
                  <Select
                    labelId="relationship-select-label"
                    id="relationship"
                    name='relationship'
                    label="Relationship"
                    onChange={handleChange}
                    size='small'
                    defaultValue={'None'}
                  >
                    <MenuItem value={'None'}>None</MenuItem>
                  </Select>
              </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Box 
            ml={2} 
            sx={{ 
              color: 'white', 
              background: 'linear-gradient(45deg, #0c2340 30%, #4a69bd 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(12, 35, 64, .3)', // This creates a subtle shadow
              padding: '10px', // Add some padding so the content isn't flush against the box edges
              borderRadius: '5px' // This makes the corners of the box rounded
            }}
          ><em>Current Academic Details</em></Box>
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
                <FormControl sx={{minWidth: 220 }}>
                    <InputLabel id="medium-select-label">Medium</InputLabel>
                    <Select
                      labelId="medium-select-label"
                      id="medium"
                      name='medium'
                      label="Medium"
                      onChange={handleChange}
                      size='small'
                      defaultValue={'None'}
                    >
                      <MenuItem value={'None'}>None</MenuItem>
                    </Select>
                </FormControl>&nbsp;&nbsp;

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
          
          <Box 
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
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <FormControl sx={{minWidth: 220 }}>
                    <InputLabel id="bank-select-label">Bank</InputLabel>
                    <Select
                      labelId="bank-select-label"
                      id="bank"
                      name='bank'
                      label="Bank"
                      onChange={handleChange}
                      size='small'
                      defaultValue={'None'}
                    >
                      <MenuItem value={'None'}>None</MenuItem>
                    </Select>
                </FormControl>
              </Box>
              <Box mb={2}><TextField label="Bank Branch" size="small" name='bank_branch' id="bank_branch" fullWidth/></Box>
              <Box mb={2}>
                <TextField label="Aadhar No." size="small" name='aadhar_no' id="aadhar_no" />
              </Box>
              <Box mb={2}><TextField type='file' size="small" id="aadhar_front" name='aadhar_front' fullWidth/><FormHelperText>Aadhar Front</FormHelperText></Box>
              <Box mb={2}><TextField type='file' size="small" id="aadhar_back" name='aadhar_back' fullWidth/><FormHelperText>Aadhar Back</FormHelperText></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <TextField label="Account No." size="small" id="account_no" name='account_no' />
              </Box>
              <Box mb={2}><TextField label="IFSC Code" size="small" id="ifsc_code" name='ifsc_code' /></Box>
            </Grid>
          </Grid>

        </Stack>
      </Paper>
    </Box>
);


};

export default Shorts