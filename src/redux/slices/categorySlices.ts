import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAddCategory{
  addCategory: boolean; 
}
interface ISeeMore{
  seeMore:boolean;
} 
interface IEdit{
  edit:boolean;
}
interface IStates extends IAddCategory, ISeeMore, IEdit { }

const initialState: IStates = {
  addCategory:false,
  seeMore:false,
  edit:false
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    onAddCompany: (state) => {
      state.addCategory=!state.addCategory;
      state.edit=false;
      state.seeMore=false;
    },
  },
})

// Action creators are generated for each case reducer function
export const {onAddCompany} = categorySlice.actions

export default categorySlice.reducer