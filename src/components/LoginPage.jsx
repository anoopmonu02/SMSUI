import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm} from 'react-hook-form'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import customaxios from '../Axios/customaxios';
import { Alert } from '@mui/material';
import MySelect from './MySelect';
import { getSessionDetails } from '../utils/globalconfigsjs';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Pronoc Technologies
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  
  //const dispatch = useDispatch();

  //akccoding1@gmail.com
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState([]);
  const [branchValue, setBranchValue] = useState('');

  const 
    {
      register, 
      setError, 
      handleSubmit, 
      control, 
      formState:{errors, isSubmitting},
    } = useForm();

  const doLogin = async(data) => {
    setError("");
    console.log("-------------------------------------------")
    try{
        console.log(data);
        console.log("email ", data['email']);
        const res = await customaxios.post('api/v1/auth/login/',{
          email: data['email'],
          password: data['password'],
          branch: data['branch']
        })
        console.log("res ", res);
        if (res && res.data.access_token) {
          //Store the user details in context - add check accordingly
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('username', res.data.name);
          localStorage.setItem('branch', res.data.branch);
          localStorage.setItem('branch_name', res.data.branch_name);
          if(res.data.branch){
            getSessionDetails(res.data.access_token);
          }
          navigate('/dashboard');
        }
        
    }catch(error){
        setError(error.message);  
        console.log("RETURNED ERROR: ", error);
        if(error.response.status === 401){
          console.log("RETURNED ERROR: ", error.response.data.detail);
          setError("login",{message: error.response.data.detail});
        }                  
    }        
};

const getBranchData = () => {
  customaxios.get(`/api/v1/auth/branches`,{
      headers: {
          'Content-Type': 'application/json'                
      }
  }).then((res) =>{
      const newOptions = res.data.map((item) => {
          return { value: item.id, label: item.branch_name };
      });
      console.log("newOptions-------------------->>>-",newOptions)
      setOptions(newOptions);
  }).catch((error) => {
      console.log(error);
  });  
}

useEffect(() =>{
  getBranchData()
},[])

const handleChange = (event) => {
  const newValue = event.target.value;
  console.log("branchValue", newValue);
  setBranchValue(newValue);
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(doLogin)} sx={{ mt: 1 }}>
              

                <MySelect
                  control={control}
                  autoFocus
                  name="branch"
                  label="Branch"
                  options={options}
                  rules={{ required: 'Branch is required' }} width="50%"                
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"                  
                  type='email'
                  {...register("email", 
                    { required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                      }
                    })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password", 
                    { required: "Password is required"})}
                />              
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>                
                </Grid>
                {/* {errors.email && <Box component="p" sx={{mt:2, padding:2, bgcolor: grey[200], color: red[900]}} elevation={2}>{errors.email.message}</Box>} */}
                {errors.email && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.email.message}
                  </Alert>
                )}
                {errors.password && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.password.message}
                  </Alert>
                )}
                {errors.branch && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.branch.message}
                  </Alert>
                )}
                {errors.login && (
                  <Alert severity="error" sx={{ mt: 2}}>
                    {errors.login.message}
                  </Alert>
                )}
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}