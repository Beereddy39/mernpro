import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/TaxiDashboard';
import AddBook from './components/AddTaxi';
import EditBook from './components/EditTaxi';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col items-center mt-4 mx-auto'>
        <main className='min-h-160 bg-gray-100 w-full flex flex-col items-center'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/editBook/:id" element={<EditBook />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;