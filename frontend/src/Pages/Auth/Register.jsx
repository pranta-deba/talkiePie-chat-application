import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDataIntoLocalStorage } from '../../utils/localStorage';
import { MessageCircle, Mail, Lock, ArrowRight, User, UserCheck } from 'lucide-react';

const Register = () => {
    const [inputData, setInputData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    const handleInput = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // validation
        if (!formData?.fullName || !formData?.username || !formData?.email || !formData?.password || !formData?.confirmPassword || !formData?.gender) {
            toast.error("Please fill all the fields");
            setLoading(false);
            return;
        }
        if (formData?.password !== formData?.confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/api/auth/register', formData);
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
        // <div className='min-h-screen flex justify-center items-center'>
        //     <div className="bg-fuchsia-200 flex items-center justify-center text-center dark:bg-gray-50 dark:text-gray-800">
        //         <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800">
        //             <label htmlFor="fullname" className="self-start text-xs font-semibold">full name</label>
        //             <input onChange={handleInput} id="fullname" type="text" name='fullname' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

        //             <label htmlFor="username" className="self-start text-xs font-semibold">username</label>
        //             <input autoComplete="username" onChange={handleInput} id="username" type="text" name='username' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

        //             <label htmlFor="email" className="self-start text-xs font-semibold">Email</label>
        //             <input onChange={handleInput} id="email" type="email" name='email' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

        //             <label htmlFor="gander" className="self-start text-xs font-semibold">Gender</label>
        //             <select onChange={handleInput} id='gender' name='gender' className="select bg-transparent border-2 border-black my-2">
        //                 <option disabled={true}>Select...</option>
        //                 <option value={"male"}>Male</option>
        //                 <option value={"female"}>Female</option>
        //             </select>

        //             <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
        //             <input autoComplete="current-password" onChange={handleInput} id="password" type="password" name='password' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

        //             <label htmlFor="confirmPassword" className="self-start mt-3 text-xs font-semibold">Confirm Password</label>
        //             <input autoComplete="current-password" onChange={handleInput} id="confirmPassword" type="password" name='confirmPassword' className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 border-2" />

        //             <button disabled={loading} type="submit" className="btn flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50">{loading ? "loading.." : "Register"}</button>
        //             <div className="flex justify-center mt-6 space-x-2 text-xs">
        //                 <span className="dark:text-gray-600">Already account?</span>
        //                 <Link to={"/login"} className="dark:text-gray-600 underline">Login</Link>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <MessageCircle className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                            Create an account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join our messaging platform
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCheck className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <select
                                className="select select-bordered w-full"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full group"
                        >
                            Sign up
                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="text-center text-sm">
                            <span className="text-gray-600">Already have an account?</span>
                            {' '}
                            <Link to="/login" className="font-medium text-primary hover:text-primary-focus">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden md:block w-1/2 bg-[#3268AA] bg-cover bg-center">
                <div className="h-full w-full bg-primary/10 backdrop-blur-sm flex items-center justify-center p-12">
                    <div className="text-white text-center">
                        <h1 className="text-5xl font-bold mb-6">MESSENGER</h1>
                        <p className="text-xl max-w-md">
                            Connect with friends and family instantly through our secure messaging platform.
                            Stay in touch with those who matter most.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;