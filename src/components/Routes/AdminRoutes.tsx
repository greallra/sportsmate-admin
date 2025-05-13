import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store/store';

export default function AdminRoutes() {
  const { user } = useAuth();
  const userZ = useStore((state) => state.user);
  console.log('userZ', userZ);
  // can check user.roles in future
  return user ? (
    <div className="private-admin-root p-4 flex">
      <Outlet />
    </div>
  ) : (
    <div className="private-admin-root p-4 flex">
      <Outlet />
    </div>
  );
}
