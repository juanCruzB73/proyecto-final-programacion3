// Importaciones necesarias
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";


// Definimos la interfaz para el estado inicial del slice
interface IInitialState {
  administracionTable: ICategorias[]; // Datos de la tabla
  administracionTable2: IAlergenos[];
  administracionTable3:IProductos[]
  elementActiveCategoria: null | ICategorias;
  elementActiveProducto:null|IProductos; // Elemento activo seleccionado
  elemetActiveAlergeno:null|IAlergenos;
  elementActiveCategoriaSubCategoria:null|ICategorias;
}

// Estado inicial del slice
const initialState: IInitialState = {
    administracionTable: [], // Inicialmente la tabla está vacía
    administracionTable2: [],
    administracionTable3: [],
    elementActiveCategoria: null, // No hay ningún elemento activo seleccionado inicialmente
    elementActiveProducto:null,
    elemetActiveAlergeno:null,
    elementActiveCategoriaSubCategoria:null,
  };

// Interfaz para la acción del payload personalizado
interface PayloadSetElementCategoria {
  element: ICategorias; // Elemento de tipo IPersona
}
interface PayloadSetElementProductos {
  element: IProductos; // Elemento de tipo IPersona
}
interface PayloadSetElementAlergenos {
  element: IAlergenos; // Elemento de tipo IPersona
}

// Creamos un slice con Redux Toolkit para manejar la tabla
const tableAdministracionSlice = createSlice({
  name: "administracion", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para establecer los datos de la tabla
    setAdministracionTable(state, action: PayloadAction<ICategorias[]>) {
      state.administracionTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
    },
    setAdministracionTable2(state, action: PayloadAction<IAlergenos[]>) {
      state.administracionTable2 = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
    },
    setAdministracionTable3(state, action: PayloadAction<IProductos[]>) {
      state.administracionTable3 = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
    },
    // Reducer para establecer el elemento activo
    setElementActiveAdministracionCategoria(state, action: PayloadAction<PayloadSetElementCategoria>) {
      state.elementActiveCategoria = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
    },
    setElementActiveAdministracionProductos(state, action: PayloadAction<PayloadSetElementProductos>) {
      state.elementActiveProducto = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
    },
    setElementActiveAdministracionAlergenos(state, action: PayloadAction<PayloadSetElementAlergenos>) {
      state.elemetActiveAlergeno = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
    },
    setElementActiveSubCategoria(state, action: PayloadAction<PayloadSetElementCategoria>) {
      state.elementActiveCategoriaSubCategoria = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
    },
    removeElementActiveProducto(state) {
      state.elementActiveProducto = null; // Eliminamos el elemento activo estableciéndolo como null
    },
    removeElementActiveAlergeno(state) {
      state.elemetActiveAlergeno = null; // Eliminamos el elemento activo estableciéndolo como null
    },
    // Reducer para eliminar el elemento activo
    
  },
});

// Exportamos los actions generados por el slice
export const {setAdministracionTable, setAdministracionTable2,setElementActiveAdministracionCategoria,setElementActiveAdministracionProductos,
  setElementActiveAdministracionAlergenos,setElementActiveSubCategoria,setAdministracionTable3,removeElementActiveProducto,removeElementActiveAlergeno } =
tableAdministracionSlice.actions;

// Exportamos el reducer generado por el slice
export default tableAdministracionSlice.reducer;