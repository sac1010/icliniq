// src/components/Signup.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLoggedIn } = useAuth();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success('Signup successful');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        message.error('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        message.error('Invalid email');
      } else if (error.code === 'auth/weak-password') {
        message.error('Weak password');
      } else {
        message.error('Error signing up');
      }
      console.log('Error signing up', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={handleSignup}
        className="w-full max-w-md bg-white p-8 shadow-md"
      >
        <h2 className="text-2xl mb-6 text-center">Signup</h2>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Signup
          </Button>
        </Form.Item>
        <Link to={"/login"}>
        <div className='text-center w-full'>

        Already a member? Login.
        </div>
        </Link>
      </Form>
    </div>
  );
};

export default Signup;
