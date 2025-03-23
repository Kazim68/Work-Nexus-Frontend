import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Components/Auth/SignUp/SignUp'; // Corrected the typo here
import OTPVerification from '../Components/Auth/SignUp/OTPverification';
import OrganizationInfo from '../Components/Auth/SignUp/OrganizationInfo';
import SignIn from '../Components/Auth/SignIn/SignIn';
import ForgotPassword from '../Components/Auth/SignIn/ForgotPassword';
import RecoveredPassword from '../Components/Auth/SignIn/RecoveredPassword';
import LeaveReview from '../../src/LeaveModule/ReviewLeave/LeaveReview';


const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/verify" element={<OTPVerification />} />
                    <Route path="/orgInfo" element={<OrganizationInfo />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/recoverpassword" element={<RecoveredPassword />} />
                    <Route path="/recoverpassword" element={<RecoveredPassword />} />
                    <Route path="/" element={<LeaveReview />} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;