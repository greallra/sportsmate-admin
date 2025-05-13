import { useEffect } from 'react';
import Header from '@/components/Header';
import PrivateRoutes from '@/components/Routes/PrivateRoutes';
import PublicRoutes from '@/components/Routes/PublicRoutes';
import AdminRoutes from '@/components/Routes/AdminRoutes';
import Login from '@/pages/login/Login';
import Signup from '@/pages/signup/Signup';
import { AuthProvider } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// import DocumentsList from '@/components/Documents/DocumentsList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';

import Admin from '@/pages/admin/AdminDatable';

import Events from '@/pages/events/Events';

import { useStore } from '@/store/store';

function App() {
  const queryClient = new QueryClient();
  const { fetchCurrentUser, getData } = useStore();

  useEffect(() => {
    async function auth() {
      getData();
      await fetchCurrentUser();
    }
    auth();
  }, [fetchCurrentUser]);
  // https://blog.logrocket.com/authentication-react-router-v6/
  // https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Header />
            <Routes>
              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<Admin />} />

                <Route path="/" element={<Events />} />
              </Route>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Events />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Events />} />

                <Route path="/download" element={<div>Download the app here</div>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </AuthProvider>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
