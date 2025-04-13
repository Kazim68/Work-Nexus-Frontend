export const getUserInfo = () => {
    try {
      const root = localStorage.getItem("persist:root");
      if (!root) return null;
  
      const parsedRoot = JSON.parse(root);
      const user = JSON.parse(parsedRoot.user);
  
      return user?.data || null; // Only return the useful `data` part
    } catch (err) {
      console.error("Failed to get user info from localStorage:", err);
      return null;
    }
  };
  

export const getToken = () => getUserInfo()?.token;