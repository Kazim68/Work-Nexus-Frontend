import api from '../ApiInterceptor';

export const getAllMyPayrolls = async () => {
    const res = await api.get('/payroll/getAllPayrolls');
    return res.data;
}

export const getPayroll = async (employeeId, year, month) => {
    const res = await api.get(`/payroll/getPayroll/${employeeId}/${year}/${month}`);
    return res.data;
}
