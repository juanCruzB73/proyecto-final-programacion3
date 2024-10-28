// Importaciones necesarias
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa"; // Importamos el tipo de dato IPersona
import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";

// Definimos la interfaz para el estado inicial del slice
interface IInitialState {
  dataTable: IEmpresa[]; // Datos de la tabla
  elementActive: null | IEmpresa; // Elemento activo seleccionado
}

// Estado inicial del slice
const initialState: IInitialState = {
  dataTable: [], // Inicialmente la tabla está vacía
  elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
};

// Interfaz para la acción del payload personalizado
interface PayloadSetElement {
  element: IEmpresa; // Elemento de tipo IPersona
}

// Creamos un slice con Redux Toolkit para manejar la tabla
const tablaEmpresaReducer = createSlice({
  name: "TablaEmpresaReducer", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para establecer los datos de la tabla
    setDataEmpresaTable(state, action: PayloadAction<any[]>) {
      state.dataTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
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
export const { setDataEmpresaTable, setElementActive, removeElementActive } =
tablaEmpresaReducer.actions;

// Exportamos el reducer generado por el slice
export default tablaEmpresaReducer.reducer;