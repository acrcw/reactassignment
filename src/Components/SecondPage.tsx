import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import theme from '../theme'; // Import your theme object
import axios from 'axios';
import DepartmentTree from './DepartmentTree'; // Adjust the path
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const departments = [
    {
      id: 1,
      name: 'Department 1',
      subDepartments: [
        {
          id: 11,
          name: 'Sub Department 1.1',
          subDepartments: [],
        },
        {
          id: 12,
          name: 'Sub Department 1.2',
          subDepartments: [
            {
              id: 121,
              name: 'Sub Department 1.2.1',
              subDepartments: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Department 2',
      subDepartments: [
        {
          id: 21,
          name: 'Sub Department 2.1',
          subDepartments: [],
        },
      ],
    },
  ];
function SecondPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user details are available in local storage
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
      <DepartmentTree departments={departments} />
    </div>

  );
}

export default SecondPage;
