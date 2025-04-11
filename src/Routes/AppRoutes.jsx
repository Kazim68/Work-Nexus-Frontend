import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Components/Auth/SignUp/SignUp'; // Corrected the typo here
import OTPVerification from '../Components/Auth/SignUp/OTPverification';
import OrganizationInfo from '../Components/Auth/SignUp/OrganizationInfo';
import SignIn from '../Components/Auth/SignIn/SignIn';


import ForgotPassword from '../Components/Auth/SignIn/ForgotPassword';
import RecoveredPassword from '../Components/Auth/SignIn/RecoveredPassword';
import LeaveStatus from '../Components/LeaveModule/ReviewLeave/LeaveReview';
import ApplyLeave from '../Components/LeaveModule/ApplyLeave/ApplyLeave';

import PricingPlan from '../Components/Payment/PricingPlan';
import PaymentSetup from '../Components/Auth/SignUp/PaymentSetup';
import LeaveDashboard from '../Components/LeaveModule/LeaveDashboard/LeaveDashboard';
import AttendanceDashboard from '../Components/LeaveModule/AttendanceDashoard/AttendanceDashboard';
import CompanyPolices from '../Components/CompanyPolices/CompanyPolicy.jsx';
import ProfileDashboard from '../Components/ProfileDashboard/ProfileDashboard';
import NewMail from '../Components/Auth/SignUp/UpdateEmail';
import Loader from '../Components/Shared/Loader';

import Home from '../Components/LandingPages/Home/Home.jsx';
import Modules from '../Components/LandingPages/Modules/Modules.jsx';
import Aim from '../Components/LandingPages/Aim/Aim';
import Services from '../Components/LandingPages/Services/Services';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleClientID } from './Secret';


const AppRoutes = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={GoogleClientID()}>
                <BrowserRouter>
                    <Routes>

                        <Route path="/signup" element={<SignUp />} />

                        <Route path="/verify" element={<OTPVerification />} />
                        <Route path="/update-email" element={<NewMail />} />

                        <Route path="/orgInfo" element={<OrganizationInfo />} />
                        <Route path="/pricing-plan" element={<PricingPlan />} />
                        <Route path="/payment" element={<PaymentSetup />} />



                        <Route path="/leave-dashboard" element={<LeaveDashboard />} />
                        <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />
                        <Route path="/company-policies" element={<CompanyPolices />} />
                        <Route path="/profile-setting" element={<ProfileDashboard />} />

                        <Route path="/" element={< Home />} />
                        <Route path="/modules" element={< Modules />} />
                        <Route path="/aim" element={< Aim />} />
                        <Route path="/services" element={< Services />} />


                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/recover-password" element={<RecoveredPassword />} />


                        <Route path="/apply-leave" element={<ApplyLeave />} />
                        <Route path="/leave-status" element={<LeaveStatus />} />

                        <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />
                        <Route path="/company-policies" element={<CompanyPolices />} />
                        <Route path="/profile-setting" element={<ProfileDashboard />} />



                    </Routes>
                </BrowserRouter>
            </GoogleOAuthProvider>

        </>
    );
};

export default AppRoutes;