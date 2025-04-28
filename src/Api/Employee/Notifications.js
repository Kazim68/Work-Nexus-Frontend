import api from '../ApiInterceptor';

export const GetNotifications = async () => {
    const res = await api.get('/notifications/myNotifications');
    return res.data;
};

export const MarkAsRead = async (notificationId) => {
    const res = await api.patch(`/notifications/markAsRead/${notificationId}`);
    return res.data;
};

export const DeleteNotification = async (notificationId) => {
    const res = await api.delete(`/notifications/delete/${notificationId}`);
    return res.data;
};
