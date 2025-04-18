import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Import your page components
import SearchPage from './pages/SearchPage/SearchPage';
import CrawlingPage from './pages/CrawlingPage/CrawlingPage';
import SavedPage from './pages/SavedPage/SavedPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ResponsePage from './pages/ResponsePage/ResponsePage';
import SingleHistory from './pages/History.js/SingleHistory';
import About from './pages/About/About';
import Working from './pages/Working/Working';
import GetStarted from './pages/GetStarted/GetStarted';



// Define routes object
const routes = [
  {
    path: '/',
    element: <SearchPage />,
  },
  {
    path: '/response',
    element: <ResponsePage />,
  },
  
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/get-started',
    element: <GetStarted />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/crawling',
    element: <CrawlingPage />,
  },
  {
    path: '/saved',
    element: <SavedPage />,
  },
  {
    path: '/response/:historyId',
    element: <SingleHistory />,
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/how-it-works',
    element:<Working/>
  },

 
];

// Main component with routing
function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
