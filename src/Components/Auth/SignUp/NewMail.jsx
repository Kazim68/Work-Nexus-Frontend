import React, { useState } from 'react'
import { update , create } from '../../../Api/Api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../Shared/ButtonLoader';

const NewMail = () => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newEmail: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const storedEmail = localStorage.getItem("email");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.newEmail) {
            tempErrors.newEmail = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.newEmail)) {
            tempErrors.newEmail = "Invalid email address.";
        }
        return tempErrors;
    };

    const updateEmail = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await update('/update-email', storedEmail, formData);
            if (res.success) {
                localStorage.setItem("email", formData.newEmail);
                toast.success("Email updated successfully! Sending OTP....");
                try {
                    const response = await create("/sendotp", {email:formData.newEmail});

                    if (response.status === 200) {
                        toast.success("OTP resent successfully.");
                        navigate('/verify')
                    } else {
                        toast.error("Failed to resend OTP.");
                    }
                } catch (error) {
                    console.error("Error resending OTP:", error);
                    toast.error(error.message || "Failed to resend OTP.");
                }
            } else {
                toast.error(res.message || "Failed to update email.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating the email.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="">
            <div className="">
                <form onSubmit={updateEmail} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="newEmail"
                            value={formData.newEmail}
                            onChange={handleChange}
                            placeholder="Enter your Email here"
                            className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${errors.newEmail ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
                        />
                        {errors.newEmail && <p className="text-red-500 text-xs">{errors.newEmail}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium flex justify-center items-center gap-2 hover:bg-teal-700"
                    >
                        {isSubmitting ? (
                            <ButtonLoader/>
                        ) : (
                            "Send OTP →"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewMail;
