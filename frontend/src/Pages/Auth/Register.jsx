import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setDataIntoLocalStorage } from '../../utils/localStorage';
import { MessageCircle, Mail, Lock, ArrowRight, User, UserCheck } from 'lucide-react';

const Register = () => {
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
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // validation
        if (!formData.fullName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.gender) {
            toast.error("Please fill all the fields");
            setLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/api/auth/register', {
                fullname: formData.fullName,
                username: formData.username,
                email: formData.email,
                gender: formData.gender,
                password: formData.password,
            });
            if (data.success) {
                console.log(data)
                toast.success(data?.message + ", please login" || "something went wrong!");
                setDataIntoLocalStorage(data.data);
                setLoading(false);
                navigate('/login', { replace: true });
            } else {
                toast.error(data?.message || "something went wrong!");
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
                            Create an account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join our messaging platform
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
                            disabled={loading}
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