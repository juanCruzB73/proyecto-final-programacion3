import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

//add popUps
interface IAddCategoria {
  addCategoria: boolean; 
}
interface IAddSubCategoria {
  addSubCategoria: boolean; 
}
interface IAddProducto {
  addProducto: boolean; 
}
interface IAddAlergeno {
  addAlergeno: boolean; 
}
//edit popups
interface IEditCategoria{
  editCategoria:boolean;
}
interface IEditSubCategoria{
  editSubCategoria:boolean;
}
interface IEditProducto{
  editProducto:boolean;
}
interface IEditAlergeno{
  editAlergeno:boolean;
}
//filters
interface ICategoriaFilter{
    categoriaFilter:boolean;
}
interface IProductoFilter{
    productoFilter:boolean;
}
interface IAlergenosFilter{
    alergenosFilter:boolean;
}

interface IStates extends IAddCategoria,IAddSubCategoria,IAddProducto,IAddAlergeno,IEditCategoria,
                          IEditSubCategoria, IEditProducto, IEditAlergeno,ICategoriaFilter,IProductoFilter,IAlergenosFilter { }

const initialState: IStates = {
  //popups adss
  addCategoria:false,
  addSubCategoria:false,
  addProducto:false,
  addAlergeno:false,
  //edit popups
  editCategoria:false,
  editSubCategoria:false,
  editProducto:false,
  editAlergeno:false,
  //filters
  categoriaFilter:true,
  productoFilter:false,
  alergenosFilter:false,
}

export const administracionSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    //filters
    onActiveCategoria:(state)=>{
        state.categoriaFilter=true ,
        state.productoFilter=false,
        state.alergenosFilter=false
    },
    onActiveProducto:(state)=>{
        state.categoriaFilter=false,
        state.productoFilter=true,
        state.alergenosFilter=false
    },
    onActiveAlergeno:(state)=>{
        state.categoriaFilter=false,
        state.productoFilter=false,
        state.alergenosFilter=true
    },
    //add popups
    onAddCategoria: (state) => {
      //addPopUps
      state.addCategoria=!state.addCategoria;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;
    },
    onAddSubCategoria:(state)=>{
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=!state.addSubCategoria;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;
    },
    onAddProducto:(state)=>{
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=!state.addProducto;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;

    },
    onAddAlergeno:(state)=>{
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=!state.addAlergeno;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;
    },
    onEditCategoria:(state)=>{
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=!state.editCategoria;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;
    },
    onEditSubCategoria:(state)=>{
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=!state.editSubCategoria;
      state.editProducto=false;
      state.editAlergeno=false;
    },
    onEditProducto:(state)=>{
        //addPopUps
        state.addCategoria=false;
        state.addSubCategoria=false;
        state.addProducto=false;
        state.addAlergeno=false;
        //editPopUps
        state.editCategoria=false;
        state.editSubCategoria=false;
        state.editProducto=!state.editProducto;
        state.editAlergeno=false;
    },
    onEditAlergeno:(state)=>{
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=!state.editAlergeno;
  },
  },
})

// Action creators are generated for each case reducer function
export const {onActiveCategoria,onActiveProducto,onActiveAlergeno,onAddCategoria,onAddSubCategoria,
              onAddProducto,onAddAlergeno,onEditCategoria,onEditSubCategoria,onEditProducto
              ,onEditAlergeno,} = administracionSlice.actions

export default administracionSlice.reducer