import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                setAllTodos(json);
            });
    }, []);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                setAllUsers(json);
            });
    }, []);

    // Calculate total number of TODOS for each user
    const todosByUser = {};
    allTodos.forEach(todo => {
        if (!todosByUser[todo.userId]) {
            todosByUser[todo.userId] = 1;
        } else {
            todosByUser[todo.userId]++;
        }
    });

    // Prepare data for chart
    const data = {
        labels: Object.keys(todosByUser).map(userId => {
            const user = allUsers.find(user => user.id === parseInt(userId));
            return user ? user.name : userId;
        }),
        datasets: [
            {
                label: 'Total TODOS',
                data: Object.values(todosByUser),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
