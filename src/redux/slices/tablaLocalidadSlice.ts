// Importaciones necesarias
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILocalidad } from "../../types/ILocalidad"; // Importamos el tipo de dato IPersona


// Definimos la interfaz para el estado inicial del slice
interface IInitialState {
  localidadTable: ILocalidad[]; // Datos de la tabla
  elementActive: null | ILocalidad; // Elemento activo seleccionado
}

// Estado inicial del slice
const initialState: IInitialState = {
  localidadTable: [], // Inicialmente la tabla está vacía
  elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
};

// Interfaz para la acción del payload personalizado
interface PayloadSetElement {
  element: ILocalidad; // Elemento de tipo IPersona
}

// Creamos un slice con Redux Toolkit para manejar la tabla
const tablaLocalidad = createSlice({
  name: "tableLocalidad", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para establecer los datos de la tabla
    setTableLocalidad(state, action: PayloadAction<any[]>) {
      state.localidadTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
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
export const { setTableLocalidad, setElementActive, removeElementActive } =
tablaLocalidad.actions;

// Exportamos el reducer generado por el slice
export default tablaLocalidad.reducer;