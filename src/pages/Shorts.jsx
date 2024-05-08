import React, { useState,useEffect } from 'react';
import {Box, Paper, Stack, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Avatar,Grid,Typography,Divider,InputLabel, Button  } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { green, red} from '@mui/material/colors';
import MyButton from '../components/MyButton';
import FormHelperText from '@mui/material/FormHelperText';
import * as glist from '../utils/constatslist';
import { PrjSelectFields } from '../components/PrjSelectFields';
import { set, useForm } from 'react-hook-form';

import PrjTextFields from '../components/PrjTextFields';
import customaxios from '../Axios/customaxios';
import PrjDatePicker from '../components/PrjDatePicker';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import GroupHeader from '../components/GroupHeader';
import { doCastLoad, doCityLoad, getBankData, getCategoryData, getGradeData, getMediumData, getProvinceData, getSectionData } from '../utils/globalconfigsjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dayjs from 'dayjs';

function Shorts() {

  const defaultValues = {
    sname: '',
    father_name: '',
    mother_name: '',
    gender: 'No Preference',
    dob: null,
    //category: '',
    //cast: '',
    nationality: 'Indian',
    registration_no: '',
    registration_date: '',
    religion: 'No Preference',
    father_occupation: '',
    mother_occupation: '',
    comments: '',
    blood_group: 'None',
    height: 0,
    weight: 0,
    bodytype: 'Normal',
    address_permanent: '',
    landmark: '',
    //province:'',
    //city: '',
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
    relationship: 'No Preference',
    guardian_contact: '',
    grade: '',
    section: '',
    branch: '',
    medium: '',
    status_school: 'Own',
    bank: '1',
    account_no: '',
    aadhar_no: '',
    bank_branch: '',
    ifsc_code: '',
}

const [formData, setFormData] = useState();

const [mediumList, setMediumList] = useState([]);
const [bankList, setBankList] = useState([]);
const [categoryList, setCategoryList] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [castList, setCastList] = useState([]);

const [provinceList, setProvinceList] = useState([]);
const [selectedProvince, setSelectedProvince] = useState("");
const [cityList, setCityList] = useState([]);

const [gradeList, setGradeList] = useState([]);
const [sectionList, setSectionList] = useState([]);

const [registrationDate, setRegistrationDate] = useState(null);
const [registrationNo, setRegistrationNo] = useState(null);

const [studentPic, setStudentPic] = useState(null);

const schema = yup.object().shape({
  sname: yup
      .string()
      .required('Student Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Only alphabets and spaces are allowed')
      .min(2, 'Minimum length should be 2 characters')      
      .max(250, 'Students Name must be maximum 250 characters'),
  father_name: yup
      .string()
      .required('Fathers Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Only alphabets and spaces are allowed')
      .min(2, 'Minimum length should be 2 characters')
      .max(250, 'Fathers Name must be maximum 250 characters'),
  mother_name: yup
      .string()
      .required('Mothers Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Only alphabets and spaces are allowed')
      .min(2, 'Minimum length should be 2 characters')      
      .max(250, 'Mothers Name must be maximum 250 characters'),
  startdate: yup
      .date()
      .typeError('DOB must be a valid date'),
    //category: yup.string().required('Category is required'),
    cast: yup.string().required('Cast is required'),
    father_occupation: yup.string().required('Fathers Occupation is required').max(100, 'Maximum 100 characters allowed'),
    mother_occupation: yup.string().required('Mothers Occupation is required').max(100, 'Maximum 100 characters allowed'),
    comments: yup.string().max(200, 'Maximum 200 characters allowed'),
    height: yup.number().typeError('Height must be a number').min(0, 'Height must be greater than or equal to 0').integer('Height must be an integer'),
    weight: yup.number().typeError('Weight must be a number').min(0, 'Height must be greater than or equal to 0').integer('Weight must be an integer'),
    address_permanent: yup.string().required('Address is required'),
    //province: yup.string().required('Province is required'),
    city: yup.string().required('City is required'),
    pincode: yup.string().matches(/^(?:[0-9]{6})?$/, 'Pincode must be 6 digits'),
    mobile1: yup.string().required('Mobile 1 is required').matches(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
    mobile2: yup.string().matches(/^(?:[0-9]{10})?$/, 'Mobile must be 10 digits'),
    email: yup.string().email('Invalid email'),
    passing_year: yup.number().typeError('Passing Year must be a number').min(0, 'Height must be greater than or equal to 0').integer('Passing Year must be an integer'),
    guardian_name: yup.string().nullable().matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed').max(200, 'Maximum 200 characters allowed'),
    guardian_contact: yup.string().matches(/^(?:[0-9]{10})?$/, 'Guardian contact must be 10 digits'),
    grade: yup.string().required('Grade is required'),
    section: yup.string().required('Section is required'),
    medium: yup.string().required('Medium is required'),
    aadhar_no: yup.string().matches(/^(?:[0-9]{12})?$/, 'Aadhar must be 12 digits'),
    student_pic: yup
      .mixed()
      .test('fileSize', 'File size is too large. Max allowed 2MB.', (value) => {
        // Check if the value is a File object
        if (value && value.length) {
          const file = value[0];
          // Check if the file size is less than or equal to 5MB (5000000 bytes)
          return file.size <= 2000000; // 5MB in bytes
        }
        // Return true if there's no file (allow empty field)
        return true;
      })
})

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
const messagetext = "Student Registration";

const genderList = glist.genderList;
const bloodGroupList = glist.choicesOfBloodGroup;
const religionList = glist.choicesOfReligion;
const bodyTypeList = glist.choicesOfBodyType;
const relationshipList = glist.choicesOfRelationship;
const 
    {
      register, 
      setError, 
      handleSubmit, 
      reset,
      watch,
      control,
      formState:{errors, isSubmitting},
    } = useForm({defaultValues:defaultValues, resolver:yupResolver(schema)});

    //saveStudent logic here   
const handleReset = () => {
  setRegistrationNo(dayjs().format('YYYYMMDDHHmmss'));
}
    const saveStudent = async(data) => {
      setError("");      
      try{
          console.log(data); 
          data.province = selectedProvince
          data.category = selectedCategory    
          data.registration_date = registrationDate
          data.registration_no = registrationNo  

          const registration_date = dayjs(data.registration_date["$d"])?.format("YYYY-MM-DD")
          data.registration_date = registration_date
          console.log("After: ",data)
          const dob = data?.dob ?dayjs(data?.dob["$d"])?.format("YYYY-MM-DD"): null
          data.dob = dob          
          data.name = data.sname 
          data.branch = localStorage.getItem('branch');
          data.academic_year = localStorage.getItem('sessionid');
          if(studentPic){
            data.student_pic= studentPic;
          }
          
          console.log("After: ",data)
          const res = await customaxios.post('/api/v1/students/student-registration/', {
            name: data.name ,
            father_name: data.father_name ,
            mother_name: data.mother_name ,
            gender: data.gender ,
            dob: data.dob ,
            category: data.category ,
            cast: data.cast ,
            nationality: data.nationality ,
            registration_no: data.registration_no ,
            registration_date: data.registration_date ,
            religion: data.religion ,
            father_occupation: data.father_occupation ,
            mother_occupation: data.mother_occupation ,
            comments: data.comments ,
            blood_group: data.blood_group ,
            height: data.height ,
            weight: data.weight ,
            bodytype: data.bodytype ,
            address_permanent: data.address_permanent ,
            landmark: data.landmark ,
            province: data.province ,
            city: data.city ,
            pincode: data.pincode ,
            mobile1: data.mobile1 ,
            mobile2: data.mobile2 ,
            email: data.email ,
            previous_school_name: data.previous_school_name ,
            previous_class: data.previous_class ,
            passing_year: data.passing_year ,
            tc_no: data.tc_no ,
            remarks: data.remarks ,
            student_type: data.student_type ,
            guardian_name: data.guardian_name ,
            relationship: data.relationship ,
            guardian_contact: data.guardian_contact ,            
            status_school: data.status_school ,
            bank: data.bank ,
            account_no: data.account_no ,
            aadhar_no: data.aadhar_no ,
            bank_branch: data.bank_branch ,
            ifsc_code: data.ifsc_code ,
            academicstudents:[{
              grade: data.grade,
              section: data.section,
              branch: data.branch,
              medium: data.medium,
              academic_year: data.academic_year,
              comments: 'Data Registered via UI'
            }]
          }, {
            headers: {
              //'Content-Type':'multipart/form-data',
              'Content-Type':'application/json',
            }
          });
          if(res.status === 201){
            //toast.success("Student registered successfully");
            //save image if selected
            toast.success("Student registered successfully", { 
              position: "top-center",
              autoClose: 3000
            });
            console.log("res ", res);
            reset();
            handleReset();
          }else{
            setError("root",{message: Object.values(res.response.data)[0]});
          }
          
          //getData();
      }catch(error){
          console.log(error);
          //setError("root",{message: Object.values(error.response.data)[0]});    
      }        
  };
    
    /* let currentDate = dayjs().format('DD/MM/YYYY');
    let formattedDate = dayjs().format('YYYYMMDDHHmmss'); */
    

    const getData = () => {      
      const access_token = localStorage.getItem('access_token');
      const branchid = localStorage.getItem('branch');
      setRegistrationDate(dayjs().format('DD/MM/YYYY'));
      setRegistrationNo(dayjs().format('YYYYMMDDHHmmss'))
      //get category list
      getCategoryData(access_token, setCategoryList)
      //get provinnce list      
      getProvinceData(setProvinceList)
      //get Medium list      
      getMediumData(access_token, setMediumList);

      //get Bank list
      getBankData(access_token, setBankList);

      //get Grade list      
      getGradeData(access_token, branchid, setGradeList);

      //get section list     
      getSectionData(access_token, branchid, setSectionList);
  }

  useEffect(() =>{
      getData()
  },[])

  useEffect(() => {
    // Load child data when selectedParent changes
    doCastLoad(selectedCategory, setCastList);
  }, [selectedCategory]);

  // Handle Category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    // Load City data when Province changes
    doCityLoad(selectedProvince, setCityList);
  }, [selectedProvince]);

  // Handle Category selection
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleFileChange = (e) => {
    setStudentPic(e.target.files[0]); // Update state with selected file
  };

return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, pr:2 }}>
      <Paper sx={{ p: 3, width: '100%' }}>
        <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor={green[100]} sx={{
          p: 2, // Adds padding inside the Box, value can be adjusted
          borderRadius: 0, // Softens the edges, value can be adjusted for more rounded corners
          boxShadow: 1, // Optional: Adds a subtle shadow for depth, can be adjusted or removed
        }}> {/* Adjusted color */}
          <Box display="flex" alignItems="center">
              <Avatar variant="rounded" sx={{ bgcolor: '#43a047' }}>SR</Avatar>
              <Box ml={2}>
                  <Typography variant="h5" component="h2" gutterBottom>
                      {messagetext}
                  </Typography>
              </Box>
          </Box>
          <MyButton variant="contained" color="success" startIcon={<ListIcon />}>List Students</MyButton>
        </Box>
        <Divider />
        <form method='post' onSubmit={handleSubmit(saveStudent)} noValidate >        
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
                  <PrjTextFields label="Registration Date" name='registration_date' 
                  id='registration_date' value={registrationDate} readOnly size="small" InputLabelProps={{ shrink: true }} 
                  fullWidth={false} control={control}/>                 
                  
                  &nbsp;&nbsp;
                  <PrjTextFields label="Registration No" name='registration_no' size="small" value={registrationNo} readOnly InputLabelProps={{ shrink: true }} 
                  control={control}/>
                  <Box mb={2}>                    
                  </Box>
                </Box>
                <Box mb={2}>
                    {/* <TextField label="Student's Name" name='name' size="small" fullWidth id="name"/> */}
                    <PrjTextFields label="Student's Name*" name='sname' size="small" id="sname" width='100%' control={control}/>                    
                </Box>
                <Box mb={2}>
                  {errors.sname && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.sname.message}
                    </Alert>
                  )}
                </Box>
                <Box mb={2}><PrjTextFields label="Father's Name*" name='father_name' size="small" width='100%' control={control}/></Box>
                <Box mb={2}>
                  {errors.father_name && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.father_name.message}
                    </Alert>
                  )}
                </Box>
                <Box mb={2}><PrjTextFields label="Mother's Name*" name='mother_name' size="small" width='100%' control={control}/></Box>
                <Box mb={2}>
                  {errors.mother_name && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.mother_name.message}
                    </Alert>
                  )}
                </Box>
                <Box mb={2}></Box>                

                <Box mb={2}>
                  <PrjSelectFields 
                  options={categoryList} label="Category*" name="category" variant="outlined" size="small" 
                  width='45%' control={control} id='category' value={selectedCategory} onChange={handleCategoryChange}/>       
                  {/* <MySelect options={categoryList} label="Category*" name="category" variant="outlined"  
                  width='45%' control={control} defaultValue={selectedCategory} onChange={handleCategoryChange}/>   */}     
                  &nbsp;&nbsp;
                  <PrjSelectFields 
                  options={castList} label="Cast*" name="cast" variant="outlined" size="small" width='45%'
                  control={control} defaultValue='' id='cast' />            
                </Box>
                <Box mb={2}>
                  {errors.category && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.category.message}
                    </Alert>
                  )}
                  {errors.cast && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.cast.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}>                
                <PrjSelectFields options={religionList} label="Religion" name="religion" variant="outlined" size="small" sx={{minWidth: 120}} control={control} width='45%' defaultValue='No Preference'/>
              </Box>
              <Box mb={2}><PrjTextFields label="Comment" name='comments' size="small" width='100%' control={control} /></Box><Box mb={2}>
                  {errors.comments && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.comments.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}>
                <TextField name='student_pic' size="small" type='file' {...register('student_pic')} onChange={handleFileChange}/><FormHelperText>Upload Student Pic(Max size allowed: 2MB) </FormHelperText>
              </Box>
              <Box mb={2}>
                  {errors.student_pic && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.student_pic.message}
                    </Alert>
                  )}
                </Box>
            </Grid>
            <Grid item xs={6}>
            
              <Box mb={2}><PrjDatePicker label="DOB" name='dob' control={control} size="small"  requiredMsg=""/></Box><Box mb={2}>
                  {errors.dob && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.dob.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}><PrjTextFields label="Nationality*" name='nationality' readOnly size="small" defaultValue="Indian" value="Indian"  control={control}/></Box>
              <Box mb={2}><PrjTextFields label="Father's Occupation" name='father_occupation' size="small" control={control} /></Box>
              <Box mb={2}>
                  {errors.father_occupation && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.father_occupation.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}><PrjTextFields label="Mother's Occupation" name='mother_occupation' size="small" control={control} /></Box>
              <Box mb={2}>
                  {errors.mother_occupation && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.mother_occupation.message}
                    </Alert>
                  )}
                </Box>
              
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
              <Box mb={2}><PrjTextFields label="Height" size="small" name='height' type="number" id="height" width='30%' control={control} defaultValue={0}/></Box>
              <Box mb={2}>
                  {errors.height && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.height.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}>
              <PrjSelectFields options={bloodGroupList} label="Blood Group" name="blood_group" width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} defaultValue="None"/>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Weight" name='weight' size="small" type="number" width='30%' control={control} defaultValue={0}/></Box>
              <Box mb={2}>
                  {errors.weight && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.weight.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}>
              <PrjSelectFields options={bodyTypeList} label="Body Type" name="bodytype" width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} defaultValue="Normal"/>
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
              <Box mb={2}><PrjTextFields label="Address" name='address_permanent' control={control} size="small" fullWidth width='100%'/></Box>
              <Box mb={2}>
                  {errors.address_permanent && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.address_permanent.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}>              
                <PrjSelectFields options={provinceList} label="Province*" name="province" 
                width='30%' variant="outlined" size="small" control={control} 
                value={selectedProvince} id='province' onChange={handleProvinceChange}/>              
              </Box>
              <Box mb={2}>
                  {errors.province && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.province.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}><PrjTextFields label="Pincode" name='pincode' size="small" control={control}/></Box>
              <Box mb={2}>
                  {errors.pincode && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.pincode.message}
                    </Alert>
                  )}
                </Box>
              <Box mb={2}><PrjTextFields label="Mobile 1" name='mobile1' size="small" control={control}/>              
              &nbsp;&nbsp;<PrjTextFields label="Mobile 2" name='mobile2' size="small" control={control}/></Box>  
                <Box mb={2}>
                {errors.mobile1 && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.mobile1.message}
                    </Alert>
                  )}
                  {errors.mobile2 && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.mobile2.message}
                    </Alert>
                  )}
                </Box>            
              <Box mb={2}><PrjTextFields type='email' label="Email" name='email' size="small" width="70%" control={control}/></Box>
              <Box mb={2}>
                  {errors.email && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.email.message}
                    </Alert>
                  )}
                </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}><PrjTextFields label="Landmark" name='landmark' size="small" control={control}/></Box>
              <Box mb={2}>
              <PrjSelectFields options={cityList} label="City*" name="city" 
              width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
              defaultValue='' id='city' />
              </Box>
              <Box mb={2}>
                  {errors.city && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.city.message}
                    </Alert>
                  )}
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
              <Box mb={2}><PrjTextFields label="Previous School" size="small" id="previous_school_name" name='previous_school_name' width="100%" control={control}/></Box>
              <Box mb={2}>
                <PrjTextFields label="TC Number" size="small" id="tc_no" name='tc_no' control={control}/>&nbsp;&nbsp;
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
                  {...register("student_type")}
                >
                  <MenuItem value={'Old'}>Old</MenuItem>
                  <MenuItem value={'New'}>New</MenuItem>
                </Select>
              </FormControl>
              </Box>
              <Box mb={2}><PrjTextFields label="Remark" size="small" name='remarks' id="remarks" width="100%" control={control}/></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <PrjTextFields label="Previous Class" size="small" name='previous_class' id="previous_class" control={control}/>&nbsp;&nbsp;
                <PrjTextFields label="Passing Year" size="small" type='number' name='passing_year' id="passing_year" defaultValue={0} control={control}/>                  
              </Box>
              <Box mb={2}>
                  {errors.passing_year && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.passing_year.message}
                    </Alert>
                  )}
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
              <Box mb={2}><PrjTextFields label="Person Name" size="small" id="guardian_name" name='guardian_name' width="100%" control={control}/></Box>
              <Box mb={2}>
                  {errors.guardian_name && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.guardian_name.message}
                    </Alert>
                  )}
                </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <PrjTextFields label="Person Contact" size="small" id="guardian_contact" name='guardian_contact' control={control}/>
                &nbsp;&nbsp;                
              <PrjSelectFields options={relationshipList} label="Relationship" name="relationship" 
              width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
              defaultValue='No Preference' id='relationship' />
              <Box mb={2}>
                  {errors.guardian_contact && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.guardian_contact.message}
                    </Alert>
                  )}
                </Box>
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
                <PrjSelectFields options={gradeList} label="Grade" name="grade" 
                width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
                defaultValue='' id='grade' />
                &nbsp;&nbsp;
                
                <PrjSelectFields options={sectionList} label="Section" name="section" 
                width='30%' variant="outlined" size="small" sx={{minWidth: 120}} control={control} 
                defaultValue='' id='section' />
                &nbsp;&nbsp;
                <Box mb={2}>
                  {errors.grade && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.grade.message}
                    </Alert>
                  )}
                </Box>
                <Box mb={2}>
                  {errors.section && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.section.message}
                    </Alert>
                  )}
                </Box>
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
                    {...register("status_school")}
                  >
                    <MenuItem value={'Own'}>Own</MenuItem>
                    <MenuItem value={'Grant'}>Granted</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
              </FormControl>
              <Box mb={2}>
                  {errors.medium && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.medium.message}
                    </Alert>
                  )}
                </Box> 
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
              <Box mb={2}>
                  {errors.aadhar_no && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.aadhar_no.message}
                    </Alert>
                  )}
                </Box> 
              <Box mb={2}><TextField type='file' size="small" id="aadhar_front" name='aadhar_front' fullWidth/><FormHelperText>Aadhar Front</FormHelperText></Box>
              <Box mb={2}><TextField type='file' size="small" id="aadhar_back" name='aadhar_back' fullWidth/><FormHelperText>Aadhar Back</FormHelperText></Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <PrjTextFields label="Account No." size="small" id="account_no" name='account_no' control={control}/>
              </Box>
              <Box mb={2}><PrjTextFields label="IFSC Code" size="small" id="ifsc_code" name='ifsc_code' control={control}/></Box>
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
                <Button type='submit' disabled={isSubmitting} variant="contained" endIcon={<SaveIcon />} color="success">
                {isSubmitting?"Form Submitting...":"Save"}
                </Button>
                <Button sx={{marginLeft:'6px'}} type='button' disabled={isSubmitting} variant="contained" endIcon={<ClearIcon />} color="warning">
                {isSubmitting?"...":"Clear"}
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