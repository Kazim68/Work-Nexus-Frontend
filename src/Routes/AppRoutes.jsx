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

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleClientID } from './Secret';
import EmployeeOnBoard from '../Components/Employee/EmployeeOnBoard.jsx';
import HrDashboard from '../Components/HrDashboard/HrDashboard.jsx';
import PaySlip from '../Components/HrDashboard/PayslipPopup.jsx';
import LeaveApproval from '../Components/HrDashboard/LeaveModule/LeaveApproval.jsx';
import EmployeePayroll from '../Components/Payroll/EmployeePayroll.jsx';
import TokenDashboard from '../Components/Tokens/TokenDashboard.jsx';
import { NotificationProvider } from '../contexts/NotificationContext.jsx';

import ProtectedRoute from './ProtectedRoutes.jsx';
import HrRoute from './HrRoutes.jsx';   


const AppRoutes = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <NotificationProvider>
                    <BrowserRouter>
                        <Routes>

                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />

                            <Route path="/verify" element={<HrRoute><OTPVerification /></HrRoute>} />
                            <Route path="/update-email" element={<HrRoute><NewMail /></HrRoute>} />

                            <Route path="/orgInfo" element={<HrRoute><CompanyReg /></HrRoute>} />
                            <Route path="/pricing-plan" element={<HrRoute><PricingPlan /></HrRoute>} />
                            <Route path="/payment" element={<HrRoute><PaymentSetup /></HrRoute>} />



                            <Route path="/dashboard" element={<ProtectedRoute><LeaveDashboard /></ProtectedRoute>} />
                            <Route path="/attendance-dashboard" element={<ProtectedRoute><AttendanceDashboard /></ProtectedRoute>} />
                            {/* <Route path="/company-policies" element={<CompanyPolices />} /> */}
                            <Route path="/profile-setting" element={<ProtectedRoute><ProfileDashboard /></ProtectedRoute>} />
                            <Route path="/profile-dashboard" element={<ProtectedRoute><ProfileDashboard /></ProtectedRoute>} />

                            {/* <Route path="/" element={<HrDashboard />} /> */}


                            <Route path="/" element={<LandingRoutes />} />


                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/recover-password" element={<RecoveredPassword />} />

                            
                            <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
                            <Route path="/recover-password" element={<ProtectedRoute><RecoveredPassword /></ProtectedRoute>} />



                            <Route path="/apply-leave" element={<ProtectedRoute><ApplyLeave /></ProtectedRoute>} />
                            <Route path="/leave-status" element={<ProtectedRoute><LeaveStatus /></ProtectedRoute>} />



                            <Route path="/employee-onboarding" element={<HrRoute><EmployeeOnBoard /></HrRoute>} />


                            <Route path="/hr-dashboard" element={<HrDashboard />} />

                            <Route path="/payslip" element={<PaySlip />} />
                            <Route path="/hr-approve-leave" element={<LeaveApproval />} />

                            <Route path="/hr/tickets" element={<TokenDashboard />} />

                        <Route path="/hr-dashboard" element={<HrRoute><HrDashboard /></HrRoute>} />

                        <Route path="/payslip/:employeeId/:year/:month" element={<ProtectedRoute><EmployeePayroll /></ProtectedRoute>} />

                        <Route path="/hr-approve-leave" element={<HrRoute><LeaveApproval /></HrRoute>} />


                        <Route path="/hr/tickets" element={<HrRoute><TokenDashboard /></HrRoute>} />

                        <Route path="/" element={<LandingRoutes />} />


                        </Routes>
                    </BrowserRouter>
                </NotificationProvider>
            </GoogleOAuthProvider>

        </>
    );
};

export default AppRoutes;