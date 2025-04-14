import React, { useState } from "react";
import { create } from "../../../Api/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../../../Redux/UserSlice";
import ButtonLoader from "../../Shared/ButtonLoader";
import signin_illustration from "../../../assets/images/signin_illustration.png";
import { FaSignInAlt } from "react-icons/fa";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { loading } = useSelector((state) => state.user);


    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            dispatch(signInStart());
            const response = await create("/auth/signin", { email, password });

            if (response.status === 200) {
                dispatch(signInSuccess(response.data));
                toast.success("Login successful!");


                if (response.data.pricingPlan == null && response.data.employee.userRole == 'admin') {
                    navigate("/pricing-plan")

                } else if (!response.data.employee.companyID && response.data.employee.userRole == 'admin') {
                    navigate("/orgInfo")

                } else if (response.data.companyEmployeeCount <=1 && response.data.employee.userRole == 'admin') {
                    navigate("/employee-onboarding")
                }
                else {
                    navigate("/attendance-dashboard")
                }
            } else {
                toast.error(response.data.message || "Login failed.");
            }
        } catch (err) {
            console.log(err)
            dispatch(signInFailure(err.message || "An unexpected error occurred"));
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const validate = () => {
        let errors = {};

        if (!email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Enter a valid Email";

        if (!password) errors.password = "Password is required";
        else if (password.length < 6) errors.password = "Minimum 6 characters";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#212020] px-4 py-8">
            <div className="w-full max-w-4xl bg-[#212020] rounded-2xl overflow-hidden border border-amber-600 shadow-lg flex flex-col lg:flex-row">
                {/* Left: Form Section */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h1 className="text-3xl font-bold text-amber-600">Welcome Back!</h1>
                            <h1 className="text-2xl font-bold text-white">Lets get some work done</h1>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email"
                                className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-3 pr-10 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                                >
                                    <img
                                        src={`https://img.icons8.com/ios-glyphs/30/d97706/${showPassword ? "visible--v1.png" : "invisible.png"}`}
                                        alt="toggle visibility"
                                        className="w-5 h-5"
                                    />
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-2 cursor:pointer tracking-wide font-semibold bg-amber-600 text-gray-100 w-full py-3 rounded-lg hover:bg-amber-700 transition-all flex items-center justify-center"
                        >
                            {loading ? (
                                <ButtonLoader />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <FaSignInAlt className="w-5 h-5 ml-1" />

                                </>
                            )}
                        </button>


                        <p className="text-center text-white text-sm">
                            Forgot Password?{" "}
                            <Link to="/forgot-password" className="text-amber-600 font-semibold hover:underline">
                                Click Here
                            </Link>
                        </p>
                    </form>

                </div>

                {/* Right: Illustration Section */}
                <div className="hidden lg:block w-1/2 h-auto">
                    <img
                        src={signin_illustration}
                        alt="Sign In Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>


            </div>
        </div>
    );
};

export default SignIn;
