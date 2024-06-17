import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const { TextArea } = Input;
const { Option } = Select;

const CreateTask = () => {
  const [form] = Form.useForm();
  const {currentUser} = useAuth()

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:3001/tasks', values, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`, 
        },
      });
      message.success('Task created successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create task');
    }
  };

  return (
    <div className='w-full'>

    <Form
      className='w-8/12 mx-auto'
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ status: 'pending' }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status!' }]}
      >
        <Select>
          <Option value="pending">Pending</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CreateTask;
