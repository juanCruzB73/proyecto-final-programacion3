import { configureStore } from '@reduxjs/toolkit'
import { companySlice } from '../slices/companySlice'
import tablaEmpresaReducer from '../slices/tablaEmpresaSlice'
import tablaCategoryReducer from '../slices/tablaCategorySlice'

export const store = configureStore({
  reducer: {
    company:companySlice.reducer,
    tablaEmpresa:tablaEmpresaReducer,
    tablaCategoria:tablaCategoryReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;