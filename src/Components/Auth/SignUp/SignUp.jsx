import React, { useState } from "react";
import { Links, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { create } from "../../../Api/Api"; // Import the generalized API function
import { toast } from "react-toastify"; // For notifications
import ButtonLoader from "../../Shared/ButtonLoader";
import GoogleLogin from './GoogleLogin';
import illustration from '../../../assets/images/Illustration.png'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        let errors = {};

        // Validate Full Name (split into firstName and lastName)
        if (!formData.fullName) {
            errors.fullName = "Full Name is required";
        } else if (!formData.fullName.includes(" ")) {
            errors.fullName = "Full Name must include both first and last name";
        }

        // Validate Email
        if (!formData.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            errors.email = "Email is invalid";

        // Validate Password
        if (!formData.password) errors.password = "Password is required";
        else if (formData.password.length < 6)
            errors.password = "Password must be at least 6 characters long";

        // Validate Confirm Password
        if (formData.password !== formData.confirmPassword)
            errors.confirmPassword = "Passwords do not match";


        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const signUp = async (e) => {
        e.preventDefault();

        if (!validate()) return;


        setIsSubmitting(true);

        try {
            const response = await create("/auth/signUp", formData);
            await create("/otp/sendotp", { email: formData.email });
            localStorage.setItem("email", formData.email);
            localStorage.setItem("employeee_id", response.data.employeeId);
            navigate("/verify");
        
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-2">
            <div className="max-w-screen-xl border-amber-600 border shadow sm:rounded-sm flex justify-center flex-1">
                {/* Image div with responsive margins */}
                <div className="flex-1 text-center hidden lg:flex bg-[#f77f00]">
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${illustration})`,
                            backgroundSize: "cover", // Ensures the image covers the entire div
                            backgroundPosition: "center", // Keeps the image centered
                            backgroundRepeat: "no-repeat", // Prevents the image from repeating
                        }}
                    ></div>
                </div>

                {/* Main form container */}
                <form onSubmit={signUp} className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                                <h1 className="text-xl xl:text-4xl font-extrabold text-amber-600">
                                    Ready On Board
                                </h1>
                                <img
                                    src="https://img.icons8.com/ios-filled/50/d97706/rocket.png"
                                    alt="Rocket"
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>

                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                />
                                {errors.fullName && <p className="text-red-500 text-xs -mt-2">{errors.fullName}</p>}


                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                />
                                {errors.email && <p className="text-red-500 text-xs -mt-2">{errors.email}</p>}

                                {/* Password Input */}
                                <div className="w-full">
                                    <div className="relative flex items-center">
                                        <input
                                            className="w-full px-5 py-3 pr-10 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <img
                                                    src="https://img.icons8.com/ios-glyphs/30/d97706/visible--v1.png"
                                                    alt="eye"
                                                    className="w-5 h-5"
                                                />
                                            ) : (
                                                <img
                                                    src="https://img.icons8.com/ios-glyphs/30/d97706/invisible.png"
                                                    alt="eye-slash"
                                                    className="w-5 h-5"
                                                />
                                            )}
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}
                                </div>



                                {/* Confirm Password Input */}
                                <div className="w-full">
                                    <div className="relative flex items-center">
                                        <input
                                            className="w-full px-5 py-3 pr-10 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm Password"
                                        />
                                        <span
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                                        >
                                            {showConfirmPassword ? (
                                                <img
                                                    src="https://img.icons8.com/ios-glyphs/30/d97706/visible--v1.png"
                                                    alt="eye"
                                                    className="w-5 h-5"
                                                />
                                            ) : (
                                                <img
                                                    src="https://img.icons8.com/ios-glyphs/30/d97706/invisible.png"
                                                    alt="eye-slash"
                                                    className="w-5 h-5"
                                                />
                                            )}
                                        </span>
                                    </div>

                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                                    )}

                                </div>


                                <button
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-amber-600 text-gray-100 w-full py-4 rounded-lg hover:bg-amber-700 cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    {isSubmitting ? (
                                        <ButtonLoader />
                                    ) : (
                                        <>
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">Create Account</span>
                                        </>
                                    )}
                                </button>

                                <p className="mt-1 text-xs text-white text-center">
                                    OR
                                </p>

                                <div>
                                    <GoogleLogin></GoogleLogin>
                                </div>

                                <p className="mt-3 text-xs text-gray-600 text-center">
                                    Already have an account?{" "}
                                    <Link to='/signin'>
                                        <span className="text-amber-600 font-semibold hover:underline">Sign in</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
