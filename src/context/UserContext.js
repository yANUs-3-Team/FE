import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext(null);

const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_BACK_IP}`,
  withCredentials: true,
  headers: { "ngrok-skip-browser-warning": "true" },
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      const userData = res?.data?.user || res?.data;
      if (userData) {
        setUser({
          username: userData.username,
          user_id: userData.user_id,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("사용자 정보 가져오기 실패", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("로그아웃 실패", error);
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  }, []);

  const value = { user, setUser, logout, loading };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}