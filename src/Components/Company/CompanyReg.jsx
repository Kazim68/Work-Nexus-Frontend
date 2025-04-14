import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaFileAlt, FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { create, createWithAuth } from "../../Api/Api";
import { upload } from "../../Api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../Shared/ButtonLoader";

const MultiStepForm = () => {
    const { data } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        if (!data || !data.token) {
          toast.error('Unauthorized, Sign in again');
          navigate('/signin');
        }
      }, [data, navigate]);
      

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: "",
        companyType: "",
        companyEmail: "",
        companyPhone: "",
        companyAddress: "",
        employeeCount: "",
        documents: null,
        workStartTime: "",
        workEndTime: "",
        logo: null,
    });
    const [errors, setErrors] = useState({});

    const validateStep1 = () => {
        const newErrors = {};
        if (formData.companyName.trim().length < 3) newErrors.companyName = "Invalid company name";
        if (!formData.companyType) newErrors.companyType = "Company Type is required";
        if (!formData.companyEmail) newErrors.companyEmail = "Company Email is required";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.companyEmail)) newErrors.companyEmail = "Invalid email";
        if (!/^\d{11,}$/.test(formData.companyPhone)) newErrors.companyPhone = "Invalid Number";
        if (!formData.companyAddress || formData.companyAddress.length < 3) newErrors.companyAddress = "Invalid address";
        if (!/^\d+$/.test(formData.employeeCount)) newErrors.employeeCount = "Invalid amount";
        if (!formData.workStartTime || !formData.workEndTime) newErrors.workTimings = "Work timings are required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
    
        // Validate documents
        if (!formData.documents || formData.documents.length === 0) {
        } else {
            const invalidDocs = Array.from(formData.documents).filter(
                (file) =>
                    !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
            );
            if (invalidDocs.length > 0) {
                newErrors.documents = "Only PDF, JPEG, and PNG files are allowed.";
            }
        }
    
        // Validate logo
        if (!formData.logo || formData.logo.length === 0) {

        } else {
            const logoFile = formData.logo[0];
            if (
                !["image/jpeg", "image/png"].includes(logoFile.type)
            ) {
                newErrors.logo = "Only JPEG, and PNG files are allowed for logo.";
            }
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files : value
        }));
    };


    const nextStep = () => {
        if (step === 1 && validateStep1()) setStep(2);
        else if (step === 2 && validateStep2()) setStep(3);
    };

    const prevStep = () => setStep((prev) => prev - 1);



    const handleSubmit = async () => {
        try {

            setLoading(true)
            const token = data?.token;

            let formDataToSend = new FormData();

            if (formData.documents && formData.documents.length > 0) {
                Array.from(formData.documents).forEach((doc) => {
                    formDataToSend.append('documents', doc);
                });
            }

            if (formData.logo && formData.logo.length > 0) {
                formDataToSend.append('logo', formData.logo[0]);
            }

            const uploadResponse = await upload("/company/upload", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });



            const payload = {
                companyName: formData.companyName,
                companyType: formData.companyType,
                contactEmail: formData.companyEmail,
                contactPhone: formData.companyPhone,
                address: formData.companyAddress,
                employeeCount: formData.employeeCount,
                workTimings: [`${formData.workStartTime} - ${formData.workEndTime}`],
                companyStatus: true,
                pricingPlan: data.pricingPlan && data.pricingPlan.planType ? data.pricingPlan.planType : 'basic',

                documents: uploadResponse.documents || [],
                companyLogo: uploadResponse.logo || null,
                companyAdmin:data.employee._id
            };
            

            await createWithAuth("/company/register", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            

            toast.success("Company registered successfully!");
            setLoading(false)
            setFormData({
                companyName: "",
                companyType: "",
                companyEmail: "",
                companyPhone: "",
                companyAddress: "",
                employeeCount: "",
                documents: null,
                workStartTime: "",
                workEndTime: "",
                logo: null,
            });
            navigate('/employee-onboarding')
            
        } catch (error) {
            setLoading(false)

            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#212020] flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-lg bg-[#212020] border border-amber-600 shadow-md rounded-lg p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-amber-600 text-center mb-2">Register Your Organization</h2>
                <p className="text-white text-center mb-6">Fill all form fields to go to next step</p>

                <ul className="flex justify-between items-center mb-6">
                    <li className="flex flex-col items-center">
                        <span className={`text-sm font-semibold ${step >= 1 ? "text-amber-600" : "text-gray-400"}`}>Company Info</span>
                        <FaInfoCircle className={`text-xl mt-1 ${step >= 1 ? "text-amber-600" : "text-gray-400"}`} />
                    </li>
                    <li className="flex flex-col items-center">
                        <span className={`text-sm font-semibold ${step >= 2 ? "text-amber-600" : "text-gray-400"}`}>Documents</span>
                        <FaFileAlt className={`text-xl mt-1 ${step >= 2 ? "text-amber-600" : "text-gray-400"}`} />
                    </li>
                    <li className="flex flex-col items-center">
                        <span className={`text-sm font-semibold ${step >= 3 ? "text-amber-600" : "text-gray-400"}`}>Finish</span>
                        <FaCheckCircle className={`text-xl mt-1 ${step >= 3 ? "text-amber-600" : "text-gray-400"}`} />
                    </li>
                </ul>

                <div className="h-2 w-full bg-gray-300 rounded mb-6">
                    <div
                        className="bg-amber-600 h-full rounded transition-all duration-300"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                {step === 1 && (
                    <fieldset>
                        <h3 className="text-white font-semibold mb-4">Step 1: Company Info</h3>
                        {["companyName", "companyType", "companyEmail", "companyPhone", "companyAddress"].map((field) => (
                            <div className="mb-4" key={field}>
                                <label className="block text-white mb-1 capitalize">
                                    {field.replace(/([A-Z])/g, " $1")} <span className="text-red-600">*</span>
                                </label>
                                {field === "companyType" ? (
                                    <select
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                    >
                                        <option value="">Select Company Type</option>
                                        {["StartUp", "Enterprise", "Non Profit"].map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field === "companyPhone" ? "tel" : field.includes("Email") ? "email" : "text"}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                                    />
                                )}
                                {errors[field] && <p className="text-red-500 text-xs ml-1">{errors[field]}</p>}
                            </div>
                        ))}

                        <div className="mb-4">
                            <label className="block text-white mb-1">Employee Count <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                name="employeeCount"
                                value={formData.employeeCount}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                placeholder="Enter Employee Count"
                            />
                            {errors.employeeCount && <p className="text-red-500 text-xs ml-1">{errors.employeeCount}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-1">Work Timings <span className="text-red-600">*</span></label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-1/2">
                                    <input
                                        type="time"
                                        name="workStartTime"
                                        value={formData.workStartTime}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <input
                                        type="time"
                                        name="workEndTime"
                                        value={formData.workEndTime}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                                    />
                                </div>
                            </div>
                            {errors.workTimings && <p className="text-red-500 text-xs ml-1">{errors.workTimings}</p>}
                        </div>

                        <div className="text-right">
                            <button className="bg-amber-600 hover:bg-amber-700 cursor-pointer text-white px-4 py-2 rounded" onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </fieldset>
                )}

                {step === 2 && (
                    <fieldset>
                        <h3 className="text-white font-semibold mb-4">Step 2: Documents & Details</h3>
                        <div className="mb-4">
                            <label className="block text-white mb-1">Upload Documents</label>
                            <input
                                type="file"
                                name="documents"
                                onChange={handleChange}
                                multiple
                                className="w-full px-5 py-2 rounded-lg font-medium bg-[#212020] border border-amber-600 text-white focus:outline-none focus:ring focus:ring-amber-600 file:bg-amber-600 file:text-white file:px-4 file:py-2 file:rounded"
                            />
                            {errors.documents && <p className="text-red-500 text-xs ml-1">{errors.documents}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-1">Upload Logo</label>
                            <input
                                type="file"
                                name="logo"
                                onChange={handleChange}
                                className="w-full px-5 py-2 rounded-lg font-medium bg-[#212020] border border-amber-600 text-white focus:outline-none focus:ring focus:ring-amber-600 file:bg-amber-600 file:text-white file:px-4 file:py-2 file:rounded"
                            />
                            {errors.logo && <p className="text-red-500 text-xs ml-1">{errors.logo}</p>}
                        </div>

                        <div className="flex justify-between">
                            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer" onClick={prevStep}>Previous</button>
                            <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 cursor-pointer" onClick={nextStep}>Next</button>
                        </div>
                    </fieldset>
                )}

                {step === 3 && (
                    <fieldset className="text-center">
                        <h2 className="text-2xl font-bold text-amber-600 mb-4">All set! Just Submit your info</h2>
                        <img
                            src="https://i.imgur.com/GwStPmg.png"
                            alt="Success"
                            className="w-32 mx-auto mb-4 text-amber-300"
                        />
                        <div className="flex justify-between">
                            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer" onClick={prevStep}>Previous</button>
                            <button className="bg-amber-600 hover:bg-amber-600 text-white px-4 py-2 rounded  cursor-pointer" onClick={handleSubmit}> {loading ? <ButtonLoader/> : 'Submit'}</button>
                        </div>
                    </fieldset>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
