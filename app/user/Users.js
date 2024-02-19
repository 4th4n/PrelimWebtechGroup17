
import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, Typography } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(usersData => {
        setUsers(usersData);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h2">Users</Typography>
      </div>
      <div style={{ padding: '20px' }}>
        <Paper style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Email</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Address</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">City</Typography>
            </Grid>
          </Grid>
          {users.map(user => (
            <Paper key={user.id} style={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: '10px', borderRadius: '10px' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar style={{ backgroundColor: '#7e57c2', color: '#ffffff' }}></Avatar>
                  <Typography variant="body1" style={{ marginLeft: '10px' }}>{user.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">{user.address.street}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">{user.address.city}</Typography>
                </Grid>
                <Grid item xs={1}>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Paper>
      </div>
    </div>
  );
};

export default Users;

