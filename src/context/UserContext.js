import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("token_expire");

    if (token && expire) {
      const now = Date.now();

      if (now < Number(expire)) {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username, token });

        const remaining = Number(expire) - now;
        console.log("⏱ 자동 로그아웃까지 남은 시간(ms):", remaining);

        const timer = setTimeout(() => {
          console.log("⏰ 세션 만료됨 — 로그아웃");
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          setUser(null);
          window.location.href = "/login";
        }, remaining);

        return () => clearTimeout(timer);
      } else {
        // 토큰 만료됨
        localStorage.clear();
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
