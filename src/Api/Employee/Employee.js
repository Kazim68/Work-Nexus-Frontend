import api from '../ApiInterceptor';

export const changePassword = async (newPassword) => {
    const res = await api.post('/employee/change-password', { newPassword });
    return res.data;
};