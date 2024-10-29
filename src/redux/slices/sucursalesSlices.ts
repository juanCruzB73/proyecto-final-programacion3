import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAddCategory{
  addSucursal: boolean; 
}
interface ISeeMore{
  seeMore:boolean;
} 
interface IEdit{
  edit:boolean;
}
interface IStates extends IAddCategory, ISeeMore, IEdit { }

const initialState: IStates = {
  addSucursal:false,
  seeMore:false,
  edit:false
}

export const sucursalSlice = createSlice({
  name: 'sucarsal',
  initialState,
  reducers: {
    onAddSucursal: (state) => {
      state.addSucursal=!state.addSucursal;
      state.edit=false;
      state.seeMore=false;
    },
    onSeeDetailsSucursal:(state)=>{
      state.addSucursal=false;
      state.edit=false;
      state.seeMore=!state.seeMore; 
    },
    onEditSucursal:(state)=>{
      state.addSucursal=false;
      state.edit=!state.edit;
      state.seeMore=false; 

    }
  },
})

// Action creators are generated for each case reducer function
export const {onAddSucursal,onSeeDetailsSucursal,onEditSucursal} = sucursalSlice.actions

export default sucursalSlice.reducer