import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store/store';

const PrivateRoutes = () => {
  //   let auth = {'token':true}
  const { user } = useAuth();
  const userZ = useStore((state) => state.user);
  console.log('userZ', userZ);

  return user ? (
    <div className="private-root p-4 ">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
