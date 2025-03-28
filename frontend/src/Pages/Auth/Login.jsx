import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setDataIntoLocalStorage } from '../../utils/localStorage';
import { useAuth } from '../../Contexts/AuthContext';
import { MessageCircle, Mail, Lock, ArrowRight, Eye, EyeClosed } from 'lucide-react';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [eyePass, setEyePass] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // validation
        if (!formData.email || !formData.password) {
            toast.error('Please fill all fields');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/api/auth/login', formData);
            if (data.success) {
                toast.success(data.message);
                setDataIntoLocalStorage(data.data);
                setUser(data.data);
                setLoading(false);
                navigate('/', { replace: true });
            } else {
                toast.error(data.message || "something went wrong!");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "something went wrong!");
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <MessageCircle className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                            Welcome back!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    autoComplete='email'
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={eyePass ? "text" : "password"}
                                    required
                                    autoComplete='new-password'
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {!eyePass ? <p onClick={() => setEyePass(!eyePass)} className='cursor-pointer'>
                                        <EyeClosed className="h-5 w-5 text-gray-400" />
                                    </p> :
                                        <p onClick={() => setEyePass(!eyePass)} className='cursor-pointer'>
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        </p>}
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary w-full group"
                        >
                            Sign in
                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="text-center text-sm space-y-2">
                            {/* <div>
                                <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-focus">
                                    Forgot your password?
                                </Link>
                            </div> */}
                            <div>
                                <span className="text-gray-600">Don't have an account?</span>
                                {' '}
                                <Link to="/register" className="font-medium text-primary hover:text-primary-focus">
                                    Sign up now
                                </Link>
                            </div>
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

export default Login;