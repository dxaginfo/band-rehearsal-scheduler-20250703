import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Container, Button } from '@mui/material';

export default function Home() {
  const router = useRouter();

  // Check authentication status and redirect if needed
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Band Rehearsal Scheduler
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Schedule rehearsals, track attendance, and manage setlists - all in one place.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={() => router.push('/login')}
            sx={{ mr: 2 }}
          >
            Log In
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            onClick={() => router.push('/register')}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}