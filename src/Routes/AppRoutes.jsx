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
import CompanyReg from '../Components/Company/CompanyReg.jsx'
import LandingRoutes from "../Components/LandingPages/LandingRoutes.jsx";
import HrDashboard from '../Components/HrDashboard/HrDashboard.jsx';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleClientID } from './Secret';
import EmployeeOnBoard from '../Components/Employee/EmployeeOnBoard.jsx';
import HRDashboard from '../Components/HR/HRDashboard.jsx';
import { NotificationProvider } from '../contexts/NotificationContext.jsx';


const AppRoutes = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <NotificationProvider>
                    <BrowserRouter>
                        <Routes>

                            <Route path="/signup" element={<SignUp />} />

                            <Route path="/verify" element={<OTPVerification />} />
                            <Route path="/update-email" element={<NewMail />} />

                            <Route path="/orgInfo" element={<CompanyReg />} />
                            <Route path="/pricing-plan" element={<PricingPlan />} />
                            <Route path="/payment" element={<PaymentSetup />} />



                            <Route path="/dashboard" element={<LeaveDashboard />} />
                            <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />
                            <Route path="/company-policies" element={<CompanyPolices />} />
                            <Route path="/profile-setting" element={<ProfileDashboard />} />
                            <Route path="/profile-dashboard" element={<ProfileDashboard />} />

                            <Route path="/" element={<HrDashboard />} />

                            {/* <Route path="/" element={<LandingRoutes />} /> */}


                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/recover-password" element={<RecoveredPassword />} />


                            <Route path="/apply-leave" element={<ApplyLeave />} />
                            <Route path="/leave-status" element={<LeaveStatus />} />



                            <Route path="/employee-onboarding" element={<EmployeeOnBoard />} />

                            <Route path="/hr-dashboard" element={<HRDashboard />} />





                        </Routes>
                    </BrowserRouter>
                </NotificationProvider>
            </GoogleOAuthProvider>

        </>
    );
};

export default AppRoutes;