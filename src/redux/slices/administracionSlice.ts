import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAddCompany {
  addCompany: boolean; 
}
interface ISeeMore{
  seeMore:boolean;
} 
interface IEdit{
  edit:boolean;
}
interface ICategoriaFilter{
    categoriaFilter:boolean;
}
interface IProductoFilter{
    productoFilter:boolean;
}
interface IAlergenosFilter{
    alergenosFilter:boolean;
}

interface IStates extends IAddCompany, ISeeMore, IEdit,ICategoriaFilter,IProductoFilter,IAlergenosFilter { }

const initialState: IStates = {
  addCompany:false,
  seeMore:false,
  edit:false,
  categoriaFilter:true,
  productoFilter:false,
  alergenosFilter:false,
}

export const administracionSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
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
    /*onAddCategoria: (state) => {
      state.addCompany=!state.addCompany;
      state.edit=false;
      state.seeMore=false;
    },
    onEditCategoria:(state)=>{
      state.addCompany=false;
      state.edit=false;
      state.seeMore=!state.seeMore; 
    },
    onAddSubCategoria:(state)=>{
      state.addCompany=false;
      state.edit=false;
      state.seeMore=!state.seeMore; 
    },
    onEditSubCategoria:(state)=>{
      state.addCompany=false;
      state.edit=false;
      state.seeMore=!state.seeMore; 
    }
    onAddProducto:(state)=>{
      state.addCompany=false;
      state.edit=!state.edit;
      state.seeMore=false; 

    },
    onEditProducto:(state)=>{
      state.addCompany=false;
      state.edit=!state.edit;
      state.seeMore=false; 

    }
    */
  },
})

// Action creators are generated for each case reducer function
export const {onActiveCategoria,onActiveProducto,onActiveAlergeno} = administracionSlice.actions

export default administracionSlice.reducer