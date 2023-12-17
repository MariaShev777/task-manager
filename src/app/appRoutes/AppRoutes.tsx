import { Navigate, Route, Routes } from 'react-router-dom';
import { TodolistsList } from 'features/todolistsList/ui/TodolistsList';
import { Login } from 'features/auth/ui/login';
import React from 'react';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodolistsList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
