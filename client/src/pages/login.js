import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Container, Box, Typography, TextField, Button, 
  Paper, Grid, Alert, CircularProgress 
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      
      try {
        // This would be replaced with a real API call
        // const response = await api.auth.login(values);
        // localStorage.setItem('token', response.data.token);
        
        // For now, simulate a successful login
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('token', 'fake_token');
        router.push('/dashboard');
      } catch (err) {
        setError('Invalid email or password');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Log In
            </Typography>
          </Box>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Log In'}
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register" passHref>
                  <Typography variant="body2" component="span" sx={{ cursor: 'pointer', color: 'primary.main' }}>
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}