import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDataIntoLocalStorage } from '../../utils/localStorage';

const Register = () => {
    const [inputData, setInputData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // validation
        if (!inputData?.fullname || !inputData?.username || !inputData?.email || !inputData?.password || !inputData?.confirmPassword || !inputData?.gender) {
            toast.error("Please fill all the fields");
            setLoading(false);
            return;
        }
        if (inputData?.password !== inputData?.confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/api/auth/register', inputData);
            if (data.success) {
                console.log(data)
                toast.success(data?.message + ", please login" || "something went wrong!");
                setDataIntoLocalStorage(data.data);
                setLoading(false);
                navigate('/login');
            } else {
                toast.error(data?.message || "something went wrong!");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error?.response?.data?.message || "something went wrong!");
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="bg-fuchsia-200 flex items-center justify-center text-center dark:bg-gray-50 dark:text-gray-800">
                <form onSubmit={onSubmit} className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800">
                    <label htmlFor="fullname" className="self-start text-xs font-semibold">full name</label>
                    <input onChange={handleInput} id="fullname" type="text" name='fullname' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="username" className="self-start text-xs font-semibold">full name</label>
                    <input onChange={handleInput} id="username" type="text" name='username' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="email" className="self-start text-xs font-semibold">Email</label>
                    <input onChange={handleInput} id="email" type="email" name='email' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="gander" className="self-start text-xs font-semibold">Gender</label>
                    <select onChange={handleInput} id='gender' name='gender' className="select bg-transparent border-2 border-black my-2">
                        <option disabled={true}>Select...</option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                    </select>

                    <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
                    <input onChange={handleInput} id="password" type="password" name='password' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <label htmlFor="confirmPassword" className="self-start mt-3 text-xs font-semibold">Confirm Password</label>
                    <input onChange={handleInput} id="confirmPassword" type="password" name='confirmPassword' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

                    <button disabled={loading} type="submit" className="btn flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50">{loading ? "loading.." : "Register"}</button>
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