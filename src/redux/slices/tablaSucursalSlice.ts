// Importaciones necesarias
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"; // Importamos el tipo de dato IPersona

// Definimos la interfaz para el estado inicial del slice
interface IInitialState {
  sucursalTable: ISucursal[]; // Datos de la tabla
  elementActive: null | ISucursal; // Elemento activo seleccionado
}

// Estado inicial del slice
const initialState: IInitialState = {
  sucursalTable: [], // Inicialmente la tabla está vacía
  elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
};

// Interfaz para la acción del payload personalizado
interface PayloadSetElement {
  element: ISucursal; // Elemento de tipo IPersona
}

// Creamos un slice con Redux Toolkit para manejar la tabla
const tablaSucursalReducer = createSlice({
  name: "tablaSucursalReducer", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para establecer los datos de la tabla
    setDataSucursalTable(state, action: PayloadAction<any[]>) {
      state.sucursalTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
    },
    // Reducer para establecer el elemento activo
    setElementActive(state, action: PayloadAction<PayloadSetElement>) {
      state.elementActive = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
    },
    // Reducer para eliminar el elemento activo
    removeElementActive(state) {
      state.elementActive = null; // Eliminamos el elemento activo estableciéndolo como null
    },
  },
});

// Exportamos los actions generados por el slice
export const { setDataSucursalTable, setElementActive, removeElementActive } =
tablaSucursalReducer.actions;

// Exportamos el reducer generado por el slice
export default tablaSucursalReducer.reducer;