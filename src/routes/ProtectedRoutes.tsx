import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoriasAlergenos } from '../views/categoriasAlergenos/CategoriasAlergenos'

export const ProtectedRoutes = () => {
  return (
    <Routes>
        <Route path='/categorias' element={<CategoriasAlergenos/>} />
    </Routes>
  )
}
