import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import theme from '../theme';
import axios from 'axios';
import DepartmentHierarchy from './DepartmentHierarchy'; 
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const departments = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },

];
function SecondPage() {
  const navigate = useNavigate();

  useEffect(() => {
   
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      alert("Please fill the data first before proceeding to this page");
      navigate('/');
    }
  }, []);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/posts')
      .then((resp) => setPosts(resp.data.posts))
      
  }, []);

  const columns = [
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Post Title', width: 300 },
    { field: 'body', headerName: 'Post Body', width: 800 },
  ];

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Second Page
      </Typography>
      <div style={{ height: '85vh', width: '100vw', marginTop: theme.spacing(2) }}>
        <DataGrid rows={posts} columns={columns} loading={posts.length==0} checkboxSelection />
      </div>
      <DepartmentHierarchy departments={departments} />
    </div>

  );
}

export default SecondPage;
