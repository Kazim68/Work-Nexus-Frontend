import React, { useState } from 'react';
import { create } from '../../../Api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../Shared/ButtonLoader';

const UpdateEmail = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address.';
    }
    return tempErrors;
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await update('/auth/update-email', storedEmail, formData);
      if (res.success) {
        localStorage.setItem("email", formData.newEmail);
        toast.success("Email updated successfully! Sending OTP....");
        try {
          const response = await create("/otp/sendotp", { email: formData.newEmail });

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
    <div>
      <div className="text-center mb-4">
        <p className="text-sm text-white">
          Entered the wrong email? Don't worry, we're here to help you update it!
        </p>
      </div>
      
      <form onSubmit={sendOtp} className="space-y-4 gap-4">
        <div>
          <input
            className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email here"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-bold bg-amber-600 text-gray-100 py-4 rounded-lg hover:bg-amber-700 cursor-pointer transition-all duration-300 ease-in-out  focus:shadow-outline focus:outline-none"
        >
          {isSubmitting ? <ButtonLoader /> : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmail;
