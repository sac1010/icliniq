// src/TaskList.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Select, message, Popconfirm } from 'antd';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const { Option } = Select;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const {currentUser} = useAuth()

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const idToken = currentUser.accessToken; // Function to get Firebase ID token
      const response = await axios.get('http://localhost:3001/tasks', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const idToken = currentUser.accessToken;
      await axios.put(`http://localhost:3001/tasks/${taskId}`, { status }, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      message.success('Task status updated');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      message.error('Failed to update task status');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const idToken = currentUser.accessToken;
      await axios.delete(`http://localhost:3001/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      message.success('Task deleted');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => updateTaskStatus(record.id, value)}
        >
          <Option value="pending">Pending</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => deleteTask(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" />;
};



export default TaskList;
