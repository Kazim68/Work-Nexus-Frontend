import React from 'react'
import { useNavigate } from "react-router";

const SginUp = () => {

    let navigate = useNavigate();

    const signUp = ()=>{
        navigate('/verify')
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center">
                        Ready to Onboard!!?
                        <img src="https://img.icons8.com/ios-filled/50/000000/rocket.png" alt="Rocket" className="w-6 h-6 ml-2" />
                    </h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" placeholder="Enter your full name" className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" placeholder="Enter your Email here" className="w-full p-3  rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" placeholder="Enter your Password" className="w-full p-3  rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>

                        <button onClick={signUp} type="submit" className="w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium flex justify-center items-center gap-2 hover:bg-teal-700">
                            Create Account →
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account? <a href="#" className="text-teal-600 font-medium">Log in</a>
                    </p>

                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-2 text-gray-500">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <div className="flex gap-3">
                        <button className="w-full flex items-center justify-center py-3 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-100">
                            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                            Sign up with Google
                        </button>
                        <button className="w-full flex items-center justify-center border-gray-400 py-3 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-100">
                            <img src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019.png" alt="Outlook" className="w-5 h-5 mr-2" />
                            Sign up With Outlook
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SginUp
