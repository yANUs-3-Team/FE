// src/context/UserContext.js
import { createContext, useEffect, useState, useCallback } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // sessionStorage에서만 복원 (백엔드 me 엔드포인트가 없으므로)
  const primeFromSession = useCallback(() => {
    try {
      const raw = sessionStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u?.user_id) {
          setUser({ username: u.username ?? "", user_id: u.user_id });
          return;
        }
      }
      const idStr = sessionStorage.getItem("user_id");
      const uid = idStr ? Number(idStr) : null;
      if (Number.isFinite(uid)) {
        setUser((prev) => prev ?? { username: "", user_id: uid });
        return;
      }
    } catch {}
    setUser(null);
  }, []);

  useEffect(() => {
    primeFromSession();
  }, [primeFromSession]);

  // (선택) 로그아웃 헬퍼
  const logout = useCallback(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user_id");
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
