
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import theme from '../theme'; // Import your theme object
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading,setLoading]=useState(false)

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();// prevent form reload
      setLoading(true);
      const formData = {
        name,
        phoneNumber,
        email,
      };
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate("/second");
      setLoading(false);
  };

  return (
    <div className="userform">
      <Typography variant="h4" sx={{ marginBottom: theme.spacing(2), color: theme.palette.text.primary }}>
        Enter Your Details
      </Typography>
      <form onSubmit={handleSubmit} >
        <TextField
          label="Name"
          variant="filled"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ marginBottom: theme.spacing(2) }} 
          InputLabelProps={{
            style: { color: theme.palette.text.secondary }, 
          }}
        />
        <TextField
          label="Phone Number"
          variant="filled"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          sx={{ marginBottom: theme.spacing(2) }} 
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <TextField
          label="Email"
          variant="filled"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputLabelProps={{
            style: { color: theme.palette.text.secondary }, 
          }}
        />
        <Button type="submit" variant="contained" color="primary"  disabled={loading} sx={{ marginTop: theme.spacing(2) }} >
          Continue
        </Button>
      </form>
    </div>
  );
}

export default LandingPage;
