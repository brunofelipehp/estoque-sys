import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './main.css';
import { FilterProduct } from './page/FilterProduct.tsx';
import { Register } from './page/Register.tsx';
import { StockEntry } from './page/StockEntry.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'sonner';
import { PrivateRouter } from './components/PrivateRouter.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AdminUsers } from './page/AdminUsers.tsx';
import { CreateUsers } from './page/CreateUsers.tsx';
import { Login } from './page/Login.tsx';
import { NotAuthorized } from './page/NotAuthorized.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <PrivateRouter allowedRoles={['ROOT', 'ADMIN', 'EDITOR', 'USER']} />, children: [
      {
        path: '/',
        element: <App />,

      },
      {
        path: '/products',
        element: <FilterProduct />,
      }
    ],
  },
  {
    element: <PrivateRouter allowedRoles={['ROOT', 'ADMIN']} />, children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/entry',
        element: <StockEntry />,
      },
      {
        path: '/user',
        element: <CreateUsers />,
      },
      {
        path: '/admin-users',
        element: <AdminUsers />,
      }
    ]

  },
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
  }]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster position='top-center' richColors />
      </React.StrictMode>
    </QueryClientProvider>
  </AuthProvider>
);
