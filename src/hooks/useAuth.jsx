// src/hooks/useAuth.jsx
//https://blog.logrocket.com/authentication-react-router-v6/
//https://stackoverflow.com/questions/73075596/how-to-use-firebase-authentication-with-redux-toolkit-using-onauthstatechanged
import { createContext, useContext, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// import useLanguages from '@/hooks/useLanguages';
// import { formatUserData } from '@/common/utils'
import { appendAuthDataToUser, esGetDoc, formatUserData } from 'exchanges-shared';
import { db as FIREBASE_DB } from '../../firebaseConfig';

const AuthContext = createContext();

import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
// import { setUserRedux } from '@/features/user/userSlice'
const auth = getAuth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  // const { languages } = useLanguages();
  const languages = [];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //admin
      if (location.pathname.includes('admin')) {
        return;
      }
      // if no user setUser(LS) to null
      if (!user) {
        setUser('');
        return navigate('/', { replace: true });
      }

      const userData = appendAuthDataToUser(user);

      esGetDoc(FIREBASE_DB, 'users', user.uid)
        .then(({ docSnap }) => {
          const combinedAuthAndCollection = { ...userData, ...docSnap.data() };
          setUser(combinedAuthAndCollection);
          login(combinedAuthAndCollection);
        })
        .catch(() => {
          // Removed: console.log(e);
        });
    });
    return unsubscribe;
  }, []);

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    // window.location.href = window.location.origin + '/exchanges'
  };

  // call this function to sign out logged in user
  const logout = () => {
    auth.signOut().then(() => {
      // Removed: console.log('signOut', user);
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
