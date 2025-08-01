import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';

import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(

      <AuthProviders>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProviders>
  ,
);
