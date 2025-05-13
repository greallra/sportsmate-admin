import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store/store';

const PublicRoutes = () => {
  //   let auth = {'token':true}
  const { user } = useAuth();
  const userZ = useStore((state) => state.todos);
  console.log('userZ', userZ);

  return !user ? (
    <div className="public-root">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/exchanges" />
  );
};

export default PublicRoutes;
