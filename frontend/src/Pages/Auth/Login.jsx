import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password })
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="bg-fuchsia-200 flex items-center justify-center text-center dark:bg-gray-50 dark:text-gray-800">
                <form onSubmit={onSubmit} className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800">
                    <label htmlFor="email" className="self-start text-xs font-semibold">Email</label>
                    <input id="email" type="email" name='email' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />
                    <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
                    <input id="password" type="password" name='password' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />
                    <button type="submit" className="btn flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Login</button>
                    <div className="flex justify-center mt-6 space-x-2 text-xs">
                        <span className="dark:text-gray-600">no account?</span>
                        <Link to={"/register"} className="dark:text-gray-600 underline">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;