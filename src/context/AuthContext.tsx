import { createContext, useContext, useEffect, useMemo, useState } from "react";

import useLogin from "../hooks/useLogin";
import useRefresh from "../hooks/useRefresh";
import jwt_decode from "jwt-decode";
import { useCallback } from "react";
import useLogout from "../hooks/useLogout";
const decodeJWT = (jwt) => {
  const decoded: any = jwt_decode(jwt);
  return {
    user: decoded.sub,
    role: decoded.roles[0],
  };
};

export const AuthContext = createContext(null);

export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    role: null,
    access_token: null,
  });
  const [loading, setLoading] = useState(true);
  const login = useLogin();
  const logout = useLogout();
  const refresh = useRefresh();

  useEffect(() => {
    let isMounted = false;
    const fn = async () => {
      const res = await refresh();
      const access_token = res.access_token;

      setLoading(false);
      if (res.error) {
        isMounted = true;
      } else if (access_token) {
        const { user, role } = decodeJWT(access_token);
        setAuth({ user, role, access_token });
      } else {
        setAuth({ user: null, role: null, access_token: null });
      }
    };

    if (!auth.user && !isMounted) {
      fn();
    }
    return () => {
      isMounted = false;
    };
  }, [refresh, auth.user]);

  const loginF = useCallback(
    async ({ l, p }) => {
      const res = await login({
        login: l,
        password: p,
      });

      setLoading(false);

      if (res.error) {
        return { user: null, role: null };
      }
      if (res.data.access_token) {
        const { user, role } = decodeJWT(res.data.access_token);
        setAuth({ user, role, access_token: res.data.access_token });
        return { user, role, access_token: res.data.access_token };
      }
    },
    [login]
  );
  const logoutF = useCallback(async () => {
    const { loggedOut } = await logout();

    if (loggedOut) {
      setAuth({ user: null, role: null, access_token: null });
    }
  }, [logout]);

  const value = useMemo(() => {
    return { auth, isAuth: !!auth.user, loginF, logoutF, loading, setAuth };
  }, [auth, loading, loginF, logoutF]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
