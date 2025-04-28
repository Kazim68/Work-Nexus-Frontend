import api from '../ApiInterceptor';

export const applyLeave = async (LeaveStartDate, LeaveEndDate, LeaveType, LeaveReason) => {
    const res = await api.post('/leave/apply', { LeaveStartDate, LeaveEndDate, LeaveType, LeaveReason });
    return res.data;
}

export const getLeaveSummary = async (employeeID) => { 
    const res = await api.get(`/leave/employee-leave-summary/${employeeID}`);
    return res.data;
}

export const getLeaveReport = async () => {
    const res = await api.get(`/leave/my-leave-requests`);
    return res.data;
}

export const cancelLeaveRequest = async (leaveId) => { 
    const res = await api.delete(`/leave/cancelLeave/${leaveId}`);
    return res.data;
}

export const getAllPendingLeaveRequests = async () => { 
    const res = await api.get('/leave/all-pending-leaves');
    return res.data;
}

export const approveLeaveRequest = async (leaveId) => { 
    const res = await api.patch(`/leave/approve/${leaveId}`);
    return res.data;
}

export const rejectLeaveRequest = async (leaveId) => { 
    const res = await api.patch(`/leave/reject/${leaveId}`);
    return res.data;
}

export const getTotalLeaveDetails = async () => { 
    const res = await api.get(`/leave/LeaveRequestsSummary`);
    return res.data;
}

export const getLeaveReportOfMonth = async () => { 
    const res = await api.get(`/leave/allLeavesOfMonth`);
    return res.data;
}
