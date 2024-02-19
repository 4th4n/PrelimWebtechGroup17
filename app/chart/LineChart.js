import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const LineChart = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalTodos, setTotalTodos] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        setTotalUsers(users.length);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        setTotalPosts(posts.length);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(comments => {
        setTotalComments(comments.length);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => {
        setTotalTodos(todos.length);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const data = {
    labels: ['Users', 'Posts', 'Comments', 'Todos'],
    datasets: [
      {
        label: 'Data Count',
        data: [totalUsers, totalPosts, totalComments, totalTodos],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
