import React from 'react'
import Layout from '../../Layout/Layout'
import LeaveStats from './LeaveStats'
import CheckInOut from './CheckInOut'
import Calendar from '../../Shared/Calendar'
import AttendanceChart from './AttendanceChart'
import ProjectPieChart from './ProjectPieChart'
import ActionCards from './ActionCards'


const Main = () => {
    return (
        <Layout>
            <div className="flex gap-27">
                <CheckInOut />
                <LeaveStats />
            </div>

            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

                    {/* Calendar (Visible only on large screens) */}
                    <div className="hidden md:hidden lg:block">
                        <Calendar  width = "w-100" height = "h-[350px]" ch='h-8'/>
                    </div>
                </div>
            </div>

            <ActionCards></ActionCards>


        </Layout>

    )
}

export default Main
