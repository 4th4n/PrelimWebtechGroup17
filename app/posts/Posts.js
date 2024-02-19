
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Avatar, Typography, Divider } from '@mui/material';
import { Collapse } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then(response => response.json())
      .then(postData => {
        setPosts(postData);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(userData => {
        setUsers(userData);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(commentData => {
        setComments(commentData);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h2">POST/COM</Typography>
      </div>
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', overflowY: 'auto' }}>
            {posts.map(post => {
              const user = users.find(user => user.id === post.userId);
              const postComments = comments.filter(comment => comment.postId === post.id);
              return (
                <Card key={post.id} style={{ marginBottom: '20px' }}>
                  <CardHeader
                    avatar={<Avatar src=" " alt={user ? user.name : 'Unknown User'} />}
                    title={user ? user.name : 'Unknown User'}
                    subheader={user ? user.email : 'Unknown Email'}
                  />
                  <CardContent>
                    <Typography variant="body1">{post.body}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button variant="outlined" color="info" onClick={() => toggleComments(post.id)}>Comments</Button>
                  </CardActions>
                  <Collapse in={expandedPostId === post.id} timeout="auto" unmountOnExit>
                    <CardContent>
                      <ul>
                        {postComments.map(comment => (
                          <li key={comment.id}>
                            <Typography variant="body2" color="textSecondary">{comment.email}</Typography>
                            <Typography variant="body2">{comment.body}</Typography>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Collapse>
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

export default Posts;