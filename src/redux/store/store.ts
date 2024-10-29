import { configureStore } from '@reduxjs/toolkit'
import { companySlice } from '../slices/companySlice'
import tablaEmpresaReducer from '../slices/tablaEmpresaSlice'
import tablaSucursalReducer from '../slices/tablaSucursalSlice'
import { sucursalSlice } from '../slices/sucursalesSlices'
import tablaPaises from '../slices/tablaPaisSlice'
import tablaProvincia from '../slices/provinciaSlice'
import tablaLocalidad from "../slices/tablaLocalidadSlice"
export const store = configureStore({
  reducer: {
    company:companySlice.reducer,
    tablaEmpresa:tablaEmpresaReducer,
    //categories
    sucursal:sucursalSlice.reducer,
    tablaSucursal:tablaSucursalReducer,
    //pais
    tablaPaises:tablaPaises,
    //provincia
    tablaProvincia:tablaProvincia,
    //localidad
    tablaLocalidad:tablaLocalidad,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;