import React from 'react'
import Layout from '../../Layout/Layout'
import LeaveStats from './LeaveStats'
import CheckInOut from './CheckInOut'
import Calendar from '../../Shared/Calendar'
import AttendanceChart from './AttendanceChart'
import ProjectPieChart from './ProjectPieChart'
import ActionCards from './ActionCards'
import { useSelector } from 'react-redux'


const Main = () => {

    return (
        <Layout>
            <div className="flex flex-col gap-4 w-full dashboard-layout">
                <div className="w-full flex justify-center checkinout-container">
                    <CheckInOut />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 custom-layout">
                    {/* Attendance Chart */}
                    <div className="bg-white p-4 lg:w-100 rounded-lg shadow-md min-h-[350px]">
                        <AttendanceChart />
                    </div>

                    {/* Project Pie Chart */}
                    <div className="bg-white p-4 lg:w-100 rounded-lg shadow-md min-h-[350px] flex flex-col items-center">
                        <h2 className="text-lg font-semibold mb-2">My Current Project</h2>
                        <div className="w-full max-w-xs">
                            <ProjectPieChart />
                        </div>
                        <button className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-md">Project 1</button>
                        <button className="mt-2 bg-blue-400 text-white px-4 py-2 rounded-md">HRMS PROJECT</button>
                    </div>

                    {/* Calendar (Only for screens > 1050px) */}
                    <div className="hidden lg:block calendar-container">
                        <Calendar width="w-100" height="h-[350px]" ch='h-8' />
                    </div>
                </div>

                <style>
                    {`
            @media (max-width: 1050px) {
                .calendar-container {
                    display: none;
                }
                .custom-layout {
                    grid-template-columns: 1fr 1fr !important;
                }
                body{
                overflow-x:hidden}
            }

            @media (min-width: 1051px) {
                .custom-layout {
                    grid-template-columns: repeat(3, 1fr) !important;
                }
            }
        `}
                </style>
            </div>


            <ActionCards />


        </Layout>

    )
}

export default Main
