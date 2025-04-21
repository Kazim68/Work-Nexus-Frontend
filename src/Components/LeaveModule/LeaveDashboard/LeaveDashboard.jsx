import React from 'react'
import Layout from '../../Layout/Layout'
import LeaveStats from './LeaveStats'
import CheckInOut from './CheckInOut'
import ActionCards from './ActionCards'
import { useSelector } from 'react-redux'
import PayslipList from './PayslipList'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../Shared/Loader'
import { toast } from 'react-toastify'
import MonthlyAttendanceInfo from '../AttendanceDashoard/MonthlyAttendanceInfo'
import { fetchOne } from '../../../Api/Api'


const Main = () => {

    const { data } = useSelector((state) => state.user);
    const employeeId = data.employee._id;
    const workingHoursString = data.employee.companyID.workTimings?.[0]; // e.g., '09:00 - 17:00'

    const { data: attendanceData, error, isLoading } = useQuery({
        queryKey: ['get_data', employeeId],
        queryFn: () => fetchOne('/attendance/summary', employeeId, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            }
        }),
        enabled: !!employeeId,
        staleTime: 0,
        cacheTime: 0,
    });

    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
    );

    if (error) toast.error(error);

    console.log(attendanceData.today)

 

    return (
        <Layout>
            <div className="flex flex-col gap-4 w-full dashboard-layout">
                <div className="w-full flex justify-center checkinout-container">
                    <CheckInOut today={attendanceData.today} />
                </div>
                <div className="w-full grid grid-cols-1 gap-4 leave-stats-container">
                    <LeaveStats />
                </div>

                <style>
                    {`
        /* Ensure everything stacks below 1050px */
        @media (max-width: 1049px) {
            .dashboard-layout {
                flex-direction: column;
            }
        }

        /* Keep Check In/Out and Leave Stats in one line from 1050px */
        @media (min-width: 1050px) {
            .dashboard-layout {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .checkinout-container, .leave-stats-container {
                flex: 1;
            }
            .leave-stats-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
        }

        /* Maintain responsiveness for large screens */
        @media (min-width: 1280px) {
            .dashboard-layout {
                flex-direction: row;
                justify-content: space-between;
            }
        }
        `}
                </style>
            </div>



            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Attendance Chart - 2/3 width on md+ screens */}
                    <div className="md:col-span-2 border border-amber-600 p-4 rounded-lg shadow-md min-h-[350px]">
                        <MonthlyAttendanceInfo thisMonthData={attendanceData?.currentMonth} previousMonthData={attendanceData?.previousMonth} />                        
                    </div>

                    {/* Payslip List - 1/3 width on md+ screens */}
                    <div className="rounded-lg shadow-md  max-h-[390px] overflow-y-auto">
                        <PayslipList />
                    </div>
                </div>
            </div>


            <ActionCards />


        </Layout>

    )
}

export default Main
