import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


//see more popup
interface ISeeProduct{
  seeProduct:boolean;
}
interface ISeeAlergeno{
  seeAlergeno:boolean;
}
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
                          IEditSubCategoria, IEditProducto, IEditAlergeno,ICategoriaFilter,IProductoFilter,
                          IAlergenosFilter,ISeeAlergeno,ISeeProduct { }

const initialState: IStates = {
  //see more popups
  seeAlergeno:false,
  seeProduct:false,
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
        //see more
        state.seeAlergeno=false;
        state.seeProduct=false;
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
      //see more
      state.seeAlergeno=false;
      state.seeProduct=false;
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
    onSeeAlergeno:(state)=>{
      //see more
      state.seeAlergeno=!state.seeAlergeno;
      state.seeProduct=false;
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;
    },
    onSeeProduct:(state)=>{
      //see more
      state.seeAlergeno=false;
      state.seeProduct=!state.seeProduct;
      //addPopUps
      state.addCategoria=false;
      state.addSubCategoria=false;
      state.addProducto=false;
      state.addAlergeno=false;
      //editPopUps
      state.editCategoria=false;
      state.editSubCategoria=false;
      state.editProducto=false;
      state.editAlergeno=false;
    },
  },
})

// Action creators are generated for each case reducer function
export const {onActiveCategoria,onActiveProducto,onActiveAlergeno,onAddCategoria,onAddSubCategoria,
              onAddProducto,onAddAlergeno,onEditCategoria,onEditSubCategoria,onEditProducto
              ,onEditAlergeno,onSeeAlergeno,onSeeProduct} = administracionSlice.actions

export default administracionSlice.reducer