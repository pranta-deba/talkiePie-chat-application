import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="bg-fuchsia-200 flex items-center justify-center text-center dark:bg-gray-50 dark:text-gray-800">
                <form className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800">
                    <label htmlFor="fullname" className="self-start text-xs font-semibold">full name</label>
                    <input id="fullname" type="text" name='fullname' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="username" className="self-start text-xs font-semibold">full name</label>
                    <input id="username" type="text" name='username' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="email" className="self-start text-xs font-semibold">Email</label>
                    <input id="email" type="email" name='email' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="gander" className="self-start text-xs font-semibold">Gender</label>
                    <select id='gander' className="select bg-transparent border-2 border-black my-2">
                        <option disabled={true}>Select...</option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                    </select>

                    <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
                    <input id="password" type="password" name='password' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <button type="submit" className="btn flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Login</button>
                    <div className="flex justify-center mt-6 space-x-2 text-xs">
                        <span className="dark:text-gray-600">Already account?</span>
                        <Link to={"/login"} className="dark:text-gray-600 underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;