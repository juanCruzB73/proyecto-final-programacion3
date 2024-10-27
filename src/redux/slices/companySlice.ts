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
interface IStates extends IAddCompany, ISeeMore, IEdit { }

const initialState: IStates = {
  addCompany:false,
  seeMore:false,
  edit:false
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    onClose:(state)=>{
      state.addCompany=false;
      state.edit=false;
      state.seeMore=false;

    },
    onAddCompany: (state) => {
      state.addCompany=!state.addCompany;
      state.edit=false;
      state.seeMore=false;
    },
    onSeeDetails:(state)=>{
      state.addCompany=false;
      state.edit=false;
      state.seeMore=!state.seeMore; 
    },
    onEditCompany:(state)=>{
      state.addCompany=false;
      state.edit=!state.edit;
      state.seeMore=false; 

    }
  },
})

// Action creators are generated for each case reducer function
export const {onAddCompany,onSeeDetails,onEditCompany} = companySlice.actions

export default companySlice.reducer