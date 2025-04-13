import { getUserInfo } from '../../utils/getUserInfo';
import api from '../ApiInterceptor';

export const applyLeave = async (LeaveStartDate, LeaveEndDate, LeaveType, LeaveReason) => {
    const res = await api.post('/leave/apply', { LeaveStartDate, LeaveEndDate, LeaveType, LeaveReason });
    return res.data;
}

export const getLeaveSummary = async () => { 
    const res = await api.get(`/leave/employee-leave-summary/${getUserInfo().employee._id}`);
    return res.data;
}