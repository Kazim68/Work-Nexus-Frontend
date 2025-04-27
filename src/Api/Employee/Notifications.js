import api from '../ApiInterceptor';

export const GetNotifications = async () => {
    const res = await api.get('/notifications/myNotifications');
    return res.data;
};