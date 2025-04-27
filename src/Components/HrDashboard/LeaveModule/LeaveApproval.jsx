import React from 'react'
import Layout from '../Layout/Layout';
import bgImg from "../../../assets/Landing Page Icons/Background Pics/2052-3-1.jpg";
import TopBar from '../TopBar';
import HRLeaveRequest from './HRLeaveRequest';
import HRTotalLeavesDetails from './HRTotalLeavesDetails';
import HRLeaveReport from './HRLeaveReport';



const LeaveApproval = () => {
    return (
        <Layout>
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
                style={{ backgroundImage: `url(${bgImg})` }}
            ></div>

            <div className="grid grid-rows-[auto_1fr] min-h-screen w-full">
                <TopBar />
                <div className="flex flex-row w-full px-6 mt-4">
                    <div className="w-[60%] flex flex-col gap-4">
                        <HRLeaveRequest />
                    </div>

                    <div className="w-[40%] pl-6 flex flex-col gap-4">
                        <HRTotalLeavesDetails />
                    </div>
                </div>

                <div className="flex flex-col w-full px-6 mt-4">
                    <div className="w-full flex flex-col gap-4">
                        <HRLeaveReport />
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default LeaveApproval
