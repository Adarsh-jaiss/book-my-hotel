"use client"
import React from 'react'
import { useState } from 'react'
import next from 'next'

export default function Signup() {
    return (
        <SignUpForm />
    )
}

function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password);

        // API Logic here
        const userData = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                alert("Account created successfully");
            } else {
                const data = await res.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error);
        }

        next.router.push("./signin");
    }


    return (

        <div className=" min-h-screen flex items-center justify-center ">
            <div className=" rounded-2xl border border-slate-300 shadow-2xl pt-10 pb-10 pl-20 pr-20 ">
                <h2 className="text-center text-2xl font-bold mb-">Create your account</h2>
                <p className="text-center text-gray-600 mb-6">Welcome! Please fill in the details to get started.</p>



                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className=" block text-gray-700 font-bold mb-2">
                            First name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="First name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Last name"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email address"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="font-medium shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-950'
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="./signin" className="text-blue-500 hover:text-blue-700">Sign in</a>
                </p>

            </div>
        </div>
    );
}











