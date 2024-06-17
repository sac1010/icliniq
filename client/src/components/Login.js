// src/components/Login.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);


  const handleLogin = async () => {
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
        await signInWithEmailAndPassword(auth, email, password);
        message.success("Login successful");
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        message.error('User not found');
      } else if (error.code === 'auth/wrong-password') {
        message.error('Wrong password');
      } else if (error.code === 'auth/invalid-email') {
        message.error('Invalid email');
      } else {
        message.error('Error logging in');
      }
      console.log("Error logging in", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        className="w-full max-w-md bg-white p-8 shadow-md"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
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
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
        <Link to={"/signup"}>
        <div className='text-center w-full'>

        Not a member? Signup.
        </div>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
