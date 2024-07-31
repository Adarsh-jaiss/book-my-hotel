"use client"
import next from 'next'
import React, { useState } from 'react'

export default function Signin() {
  return (
    < SignInForm />
  )
}

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(email, password)

    // API Logic here
    const userData = {
      email,
      password
    };

    try {
      const res = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        "headers": {
          "content-type": "application/json",
          // "X-Api-Token": ""
        },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        alert("Sign in successful");
        // set header X-Api-Token to res.token
        const data = await res.json();
        console.log(data);
        const token = data.token;
        const id = data.user.id;
        setToken(token);
        
        if (!id) {
          throw new Error('User ID is undefined');
        }

        console.log("Token before request:", token);

        try {
          const subsequentRes = await fetch(`http://localhost:8000/api/auth/user/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Token': token,
            },
          });
          console.log("token found:", token);

          // Handle the response from the subsequent request
          const subsequentData = await subsequentRes.json();
          console.log(subsequentData);

          localStorage.setItem('token', data.token); // Store the token in local storage

          // Navigate to the hotels page after the subsequent request is successful
          next.router.push('/hotels');
        } catch (error) {
          console.error('Error in subsequent request:', error);
        }


      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }


    // next.router.push('/hotels');

  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='rounded-2xl border border-slate-300 shadow-2xl pt-10 pb-10 pl-20 pr-20'>
        <h2 className='text-center text-2xl font-bold mb-'>Sign in to your account</h2>
        <p className='text-center text-gray-600 mb-6'>Welcome back! Please sign in to continue.</p>


        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label htmlFor='email' className='block  font-medium text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='email'
              className='shadow appearance-none mt-1 p-2 block w-full border border-slate-300 rounded-xl leading-tight focus:outline-none focus:shadow-outline  sm:text-sm'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block font-medium text-gray-700'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='password'
              className='shadow appearance-none mt-1 p-2 block w-full border border-slate-300 rounded-xl leading-tight focus:outline-none focus:shadow-outline sm:text-sm'
            />
          </div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-950'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

