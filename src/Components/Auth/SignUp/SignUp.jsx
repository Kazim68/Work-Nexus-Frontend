import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { create } from "../../../Api/Api"; // Import the generalized API function
import { toast } from "react-toastify"; // For notifications
import ButtonLoader from "../../Shared/ButtonLoader";

const SignUp = () => {
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
            await create("/signUp", formData);
            await create("/sendotp", { email: formData.email });
            localStorage.setItem("email", formData.email);

            navigate("/verify");
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center">
                    Ready to Onboard!!?
                    <img
                        src="https://img.icons8.com/ios-filled/50/000000/rocket.png"
                        alt="Rocket"
                        className="w-6 h-6 ml-2"
                    />
                </h2>

                <form onSubmit={signUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${errors.fullName ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email here"
                            className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your Password"
                                className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer">
                                {showPassword ? (
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png" alt="eye" className="w-6 h-6" />
                                ) : (
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/invisible.png" alt="eye-slash" className="w-6 h-6" />
                                )}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your Password"
                                className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 cursor-pointer">
                                {showConfirmPassword ? (
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png" alt="eye" className="w-6 h-6" />
                                ) : (
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/invisible.png" alt="eye-slash" className="w-6 h-6" />
                                )}
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium flex justify-center items-center gap-2 hover:bg-teal-700"
                    >
                        {isSubmitting ? (
                            <ButtonLoader />
                        ) : (
                            "Create Account →"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="../signin" className="text-teal-600 font-medium">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
