import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function SideDrawer() {
  return (
    <nav className="bg-red-100 h-full">
      <ul className="pt-4">
        <li className="py-1 px-3">
          <Link to="/" className="text-4xl">
            Summary
          </Link>
        </li>
        <li className="py-1 px-3">
          <Link to="/documents" className="text-4xl">
            Documents
          </Link>
        </li>
      </ul>
    </nav>
  );
}
