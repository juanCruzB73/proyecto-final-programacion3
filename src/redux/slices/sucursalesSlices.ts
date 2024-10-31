import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAddCategory{
  addSucursal: boolean; 
}
interface ISeeMore{
  seeMoreSucursal:boolean;
} 
interface IEdit{
  editSucursal:boolean;
}
interface IStates extends IAddCategory, ISeeMore, IEdit { }

const initialState: IStates = {
  addSucursal:false,
  seeMoreSucursal:false,
  editSucursal:false
}

export const sucursalSlice = createSlice({
  name: 'sucarsal',
  initialState,
  reducers: {
    onAddSucursal: (state) => {
      state.addSucursal=!state.addSucursal;
      state.editSucursal=false;
      state.seeMoreSucursal=false;
    },
    onSeeDetailsSucursal:(state)=>{
      state.addSucursal=false;
      state.editSucursal=false;
      state.seeMoreSucursal=!state.seeMoreSucursal; 
    },
    oneditSucursalSucursal:(state)=>{
      state.addSucursal=false;
      state.editSucursal=!state.editSucursal;
      state.seeMoreSucursal=false; 

    }
  },
})

// Action creators are generated for each case reducer function
export const {onAddSucursal,onSeeDetailsSucursal,oneditSucursalSucursal} = sucursalSlice.actions

export default sucursalSlice.reducer