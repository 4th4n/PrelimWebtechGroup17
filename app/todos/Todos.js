
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, Divider } from '@mui/material';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todoData => {
        setTodos(todoData);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setError(error); 
      });
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(userData => {
        setUsers(userData);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error); 
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h2">TODOS</Typography>
      </div>
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', overflowY: 'auto' }}>
            {todos.map(todo => {
              const user = users.find(user => user.id === todo.userId);
              return (
                <Card key={todo.id} style={{ marginBottom: '20px' }}>
                  <CardHeader
                    avatar={<Avatar src="PUT_AVATAR_URL_HERE" alt={user ? user.name : 'Unknown User'} />}
                    title={user ? user.name : 'Unknown User'}
                    subheader={user ? user.email : 'Unknown Email'}
                  />
                  <CardContent>
                    <Typography variant="body1">{todo.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {todo.completed ? 'Completed' : 'Incomplete'}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                  </CardActions>
                  <Divider />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todos;
